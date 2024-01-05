import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from 'src/entity/music.entity';
import { CreateMusicDto } from 'src/dto/create-music.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
  ) {}

  async createMusic(createMusicDto: CreateMusicDto): Promise<Music> {
    const newMusic = this.musicRepository.create(createMusicDto);
    return this.musicRepository.save(newMusic);
  }

  async getMusic(id: number): Promise<Music | null> {
    return this.musicRepository.findOneBy({ id });
  }

  async getAllMusic(): Promise<Music[]> {
    return this.musicRepository.find();
  }

  async updateMusic(id: number, name: string): Promise<Music | null> {
    const music= await this.musicRepository.findOneBy({ id });
    if (!music) {
      return null;
    }
    music.name = name;
    return this.musicRepository.save(music);
  }

  async deleteMusic(id: number): Promise<boolean> {
    const result = await this.musicRepository.delete(id);
    return result.affected > 0;
  }
}
