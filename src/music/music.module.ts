import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/entity/music.entity';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Music])],
  providers: [MusicService],
  exports: [MusicService], 
  controllers: [MusicController]
})
export class MusicModule {}