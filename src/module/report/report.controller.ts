import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('api/report')
export class ReportController {
    constructor(private reportService: ReportService) { }

    @Get('summary')
    async summary() {
        const data = await this.reportService.summaryReport();
        if (!data) {
            throw new NotFoundException('User not found');
        }
        return { success: true, data };
    }

    @Get('status')
    async status() {
        const data = await this.reportService.reportByStatus();
        if (!data) {
            throw new NotFoundException('User not found');
        }
        return { success: true, data };
    }

    @Get('device-type')
    async deviceType() {
        const data = await this.reportService.reportByDeviceType();
        if (!data) {
            throw new NotFoundException('User not found');
        }
        return { success: true, data };
    }


    @Get('statistic/:year')
    async statisticYear(@Param('year') year: number) {
        const data = await this.reportService.statisticByYear(Number(year));
        if (!data) {
            throw new NotFoundException('User not found');
        }
        return { success: true, data };

    }
}