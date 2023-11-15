import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @UseGuards(LocalAuthGuard)
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
