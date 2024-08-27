import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthService } from './helth.service';
import { IHealthStatus } from './helth.interface';
import { GenericResponse } from 'src/common/generic-response.interface';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getApiDetails(): Promise<GenericResponse<IHealthStatus>> {
    return this.healthService.getHealthStatus();
  }
}
