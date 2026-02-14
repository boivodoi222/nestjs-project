import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDisposalDto } from './dto/create-disposal.dto';
import { UpdateDisposalDto } from './dto/update-disposal.dto';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class DisposalService {
    constructor(private prisma: PrismaService) { }
    // tính khấu hao
    async create(body: CreateDisposalDto): Promise<any> {
        // 1. Lấy thiết bị
        const device = await this.prisma.device.findUnique({
            where: { deviceId: body.deviceId },
        });
        if (!device) { throw new HttpException('Thiết bị không tồn tại', HttpStatus.NOT_FOUND); }
        const existedDisposal = await this.prisma.deviceDisposals.findFirst({
            where: { deviceId: body.deviceId },
        });
        if (existedDisposal) { throw new HttpException('Thiết bị đã có hồ sơ thanh lý', HttpStatus.BAD_REQUEST); }
        // 2. Lấy giá mua & ngày mua từ Device
        const purchasePrice = Number(device.purchasePrice);
        const purchaseDate = device.purchaseDate;
        const disposalDate = new Date();
        // 3. Tính khấu hao
        const lifespanYears = 5;
        const usedYears = Math.max(0,(disposalDate.getTime() - purchaseDate.getTime()) /(1000 * 60 * 60 * 24 * 365.25));
        const annualDepreciation = purchasePrice / lifespanYears;
        const depreciatedValue = usedYears * annualDepreciation;
        const remainingValue =
            purchasePrice - depreciatedValue > 0
                ? Math.round(purchasePrice - depreciatedValue)
                : 0;

        // 4. Tạo bản ghi thanh lý
        const disposal = await this.prisma.deviceDisposals.create({
            data: {
                deviceId: body.deviceId,
                disposaldate: disposalDate,
                reason: body.reason,
                finalStatus: "Chờ Duyệt",
                remainingValue: new Prisma.Decimal(remainingValue),
                notes: body.notes,
            },
        });

        // 5. Lưu lịch sử trạng thái
        await this.prisma.deviceStatusHistory.create({
            data: {
                deviceId: body.deviceId,
                statusId: 4,
                note: 'Thanh lý thiết bị',
            },
        });

        return disposal;
    }

    // danh sách thanh lý
    async getAll() {
        return this.prisma.deviceDisposals.findMany();
    }

    // chi tiết thanh lý
    async getById(id: number) {
        const disposal = await this.prisma.deviceDisposals.findFirst({ where: { disposalId: id }, });
        if (!disposal) throw new HttpException("Không tồn tại trong danh sach thanh lý", HttpStatus.NOT_FOUND);
        return disposal;
    }

    // Lấy danh sách những  thiết bị có thể thanh lý
    async getDevicesNeedDisposal() {
        return this.prisma.device.findMany({
            where: {
                disposals: {
                    none: {} // chưa thanh lý
                }
            }
        });
    }


    // phê duyệt thanh lý
    async approveDisposal(id: number, body: UpdateDisposalDto, userId: number): Promise<any> {
        const disposal = await this.prisma.deviceDisposals.findFirst({
            where: { disposalId: id }
        });
        if (!disposal) throw new HttpException("Không tồn tại trong danh sach thanh lý", HttpStatus.NOT_FOUND);

        if (disposal.finalStatus === "ĐÃ DUYỆT")
            throw new HttpException("Đã phê duyệt trước đó", HttpStatus.BAD_REQUEST);

        const approved = await this.prisma.deviceDisposals.update({
            where: { disposalId: id },
            data: {
                ...body,
                finalStatus: body.finalStatus,
                approvedBy: userId,
                approvedDate: new Date(),
            }
        });

        // cập nhật trạng thái thiết bị
        await this.prisma.deviceStatusHistory.create({
            data: {
                deviceId: disposal.deviceId,
                statusId: 4, // Đã thanh lý
                note: "Đã thanh lý",
            }
        });

        return approved;
    }

    async delete(id: number): Promise<any> {
        const disposal = await this.prisma.deviceDisposals.findFirst({
            where: { disposalId: id }
        });
        if (!disposal) throw new HttpException("Không tồn tại trong danh sach thanh lý", HttpStatus.NOT_FOUND);

        return this.prisma.deviceDisposals.delete({
            where: { disposalId: id }
        });
    }

}
