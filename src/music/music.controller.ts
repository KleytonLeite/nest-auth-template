import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuditInterceptor } from '../audit/AuditInterceptor';
import { RolesGuard } from 'src/roles/roles.guard';
import { MusicService } from './music.service';
import { Roles } from 'src/roles/roles.decorator';
import { CreateMusicDto } from 'src/dto/create-music.dto';
import { classToPlain } from 'class-transformer';

@ApiTags('music')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuditInterceptor)
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  //@Roles('ADMIN')
  @Post()
  createMusic(@Body() createMusicDto: CreateMusicDto) {
    const music = this.musicService.createMusic(createMusicDto);
    return music;
  }

  @Get(':id')
  getMusic(@Param('id') id: number) {
    return this.musicService.getMusic(id);
  }

  @Get()
  getAllMusics() {
    return this.musicService.getAllMusic();
  }

  @Roles('ADMIN')
  @Put(':id')
  updateMusic(@Param('id') id: number, @Body('name') name: string) {
    return this.musicService.updateMusic(id, name);
  }

  @Roles('ADMIN')
  @Delete(':id')
  deleteMusic(@Param('id') id: number) {
    return this.musicService.deleteMusic(id);
  }
}

