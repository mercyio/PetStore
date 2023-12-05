import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Post()
  @Put()
  @Patch()
  @Delete()
  
  getHello(): string {
    return this.appService.getHello();
  }
}
