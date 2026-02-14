import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) { }

    async summaryReport() {
        const totalDevices = await this.prisma.device.count();

        const assigned = await this.prisma.deviceAssignments.count({
            where: { returneddate: null },
        });

        const disposed = await this.prisma.deviceDisposals.count({
            where: { approvedBy: { not: null } },
        });

        const pendingDisposal = await this.prisma.deviceDisposals.count({
            where: { approvedBy: null },
        });

        const devices = await this.prisma.device.findMany();
        const disposals = await this.prisma.deviceDisposals.findMany({
            where: { approvedBy: { not: null } },
        });

        const totalPurchaseValue = devices.reduce(
            (sum, d) => sum + Number(d.purchasePrice),
            0,
        );

        const totalRemainingValue = disposals.reduce(
            (sum, d) => sum + Number(d.remainingValue),
            0,
        );

        return {
            totalDevices,
            inUseDevices: totalDevices - disposed,
            assignedDevices: assigned,
            pendingDisposal,
            disposedDevices: disposed,
            totalPurchaseValue,
            totalRemainingValue,
            totalDepreciation: totalPurchaseValue - totalRemainingValue,
        };
    }
    async statisticByYear(year: number) {
        return this.prisma.device.groupBy({
            by: ['purchaseDate'],
            where: {
                purchaseDate: {
                    gte: new Date(`${year}-01-01`),
                    lte: new Date(`${year}-12-31`),
                },
            },
            _count: {
                deviceId: true,
            },
            _sum: {
                purchasePrice: true,
            },
        });
    }
    async reportByStatus() {
        return {
            inUse: await this.prisma.device.count({
                where: {
                    disposals: { none: { approvedBy: { not: null } } },
                },
            }),

            assigned: await this.prisma.deviceAssignments.count({
                where: { returneddate: null },
            }),

            pendingDisposal: await this.prisma.deviceDisposals.count({
                where: { approvedBy: null },
            }),

            disposed: await this.prisma.deviceDisposals.count({
                where: { approvedBy: { not: null } },
            }),
        };
    }
    async reportByDeviceType() {
        return this.prisma.device.groupBy({
            by: ['deviceTypeId'],
            _count: {
                deviceId: true,
            },
            _sum: {
                purchasePrice: true,
            },
        });
    }


}
