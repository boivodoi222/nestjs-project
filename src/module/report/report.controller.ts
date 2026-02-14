import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('api/report')
export class ReportController {
    constructor(private reportService: ReportService) { }

    @Get('summary')
    async summary(@Res() res) {
        const summary = await this.reportService.summaryReport();
        if (!summary) {
            throw new NotFoundException('User not found');
        }
        return res.json(summary);
    }

    @Get('status')
    async status(@Res() res) {
        const status = await this.reportService.reportByStatus();
        if (!status) {
            throw new NotFoundException('User not found');
        }
        return res.json(status);
    }

    @Get('device-type')
    async deviceType(@Res() res) {
        const type = await this.reportService.reportByDeviceType();
        if (!type) {
            throw new NotFoundException('User not found');
        }
        return res.json(type);
    }


    @Get('statistic/:year')
    async statisticYear(@Param('year') year: number, @Res() res) {
        const statistic = await this.reportService.statisticByYear(Number(year));
        if (!statistic) {
            throw new NotFoundException('User not found');
        }
        return res.json(statistic);

    }
}