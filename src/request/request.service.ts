import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';


@Injectable()
export class RequestService {
    constructor(private prisma: PrismaService) { }
    // tạo yêu cầu
    async createRequest(body: CreateRequestDto, userId: number): Promise<any> {
        console.log('USERID SERVICE:', userId);
        const request = await this.prisma.requests.create({
            data: {
                requestTypeId: body.requestTypeId,
                requestedBy: userId,
                description: body.description,
                status: 'Đang chờ',
            }
        });
        if (!request) {
            throw new HttpException('Tạo yêu cầu thất bại', HttpStatus.BAD_REQUEST);
        }

        return request;
    }
    // danh sách yêu cầu
    async getRequests() {
        return this.prisma.requests.findMany();
    }
    // lấy yêu cầu theo id
    async getRequest(id: number): Promise<any> {
        const request = await this.prisma.requests.findFirst({
            where: { requestId: id },
        });
        if (!request) {
            throw new HttpException('Không tìm thấy yêu cầu', HttpStatus.NOT_FOUND);
        }
        return request;
    }

    // xử lý yêu cầu
    async updateRequest(id: number, body: UpdateRequestDto, userId: number): Promise<any> {
        const request = await this.prisma.requests.findFirst({
            where: { requestId: id },
        });
        if (!request) {
            throw new HttpException('Không tìm thấy yêu cầu', HttpStatus.NOT_FOUND);
        }
        
        return this.prisma.requests.update({
            where: { requestId: id },
            data: {
                ...body,
                approvedBy: userId,
                approvedDate: new Date(),

            },
        });
    }
    // xóa yêu cầu
    async deleteRequest(id: number): Promise<any> {
        const request = await this.prisma.requests.findUnique({
            where: { requestId: id },
        });
        if (!request) {
            throw new HttpException('Không tìm thấy yêu cầu', HttpStatus.NOT_FOUND);
        }
        return this.prisma.requests.delete({
            where: { requestId: id },
        });
    }
}