import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssignDto } from './dto/assign.dto';
import { ReturnDto } from './dto/return.dto';

@Injectable()
export class AssignmentService {
    constructor(private prisma: PrismaService) { }
    //Lấy danh sách gán
    async getAssignments() {
        return this.prisma.deviceAssignments.findMany();
    }
    // Lấy thông tin thiết bị được gán
    async getAssignment(id: number): Promise<any> {
        const assignment = await this.prisma.deviceAssignments.findFirst({
            where: { assignmentId: id },
        });
        if (!assignment) {
            throw new HttpException('Không tìm thấy thiết bị được gán', HttpStatus.NOT_FOUND);
        }
        return assignment;
    }
    // gán thiết bị cho người dùng
    async createAssignment(@Body() body: AssignDto): Promise<any> {
        const assignment = await this.prisma.deviceAssignments.create({ data: body });
        if (!assignment) {
            throw new HttpException('Tạo gán thiết bị thất bại', HttpStatus.BAD_REQUEST);
        }
        await this.prisma.deviceStatusHistory.create({
            data: {
                deviceId: body.deviceId,
                statusId: 2,
                note: "Đang sử dụng"
            }
        });
        return assignment
    }

    // thu hồi thiết bị
    async unAssignAssignment(id: number, body: ReturnDto): Promise<any> {
        const assignment = await this.prisma.deviceAssignments.findFirst({
            where: { assignmentId: id },
        });;
        if (!assignment) {
            throw new HttpException('Không tìm thấy thiết bị được  gán', HttpStatus.NOT_FOUND);
        }
        const unAassign = await this.prisma.deviceAssignments.update({
            where: { assignmentId: id },
            data: {
                ...body,
                returneddate: new Date(),
            },
        });
        await this.prisma.deviceStatusHistory.create({
            data: {
                deviceId: assignment.deviceId,
                statusId: 1,
                note: "Thu hồi",
            },
        });
        return unAassign;
    }


    async deleteAssignment(id: number): Promise<any> {
        const assignment = await this.prisma.deviceAssignments.findUnique({
            where: { assignmentId: id },
        });
        if (!assignment) {
            throw new HttpException('Không tìm thấy thiết bị được gán', HttpStatus.NOT_FOUND);
        }
        return this.prisma.deviceAssignments.delete({
            where: { assignmentId: id },
        });
    }
}

