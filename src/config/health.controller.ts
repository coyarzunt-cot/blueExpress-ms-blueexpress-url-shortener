import {  Controller,  Get, } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor() {}

 
  @Get()
  async health() {
    console.log('=======> NEW REQUEST GET-health',);
    return "Health OK"
  }

}
