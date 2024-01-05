import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'autor', description: 'O nome da banda auto ou cantor' })
  author: string;


  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'name da musica', description: 'O namo da musica' })
  name: string;


  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'nome-da-musica', description: 'O slag unica para cada musica' })
  slang: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'G', description: 'A tonalidade da musica' })
  tone: string;


  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'https://cifra.com', description: 'O link da cifra' })
  urlCipher: string;

  @IsString()
  @ApiProperty({ example: 'https://letra.com', description: 'O link do letra' })
  urlLetter: string;


  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'https://video.com', description: 'O link do video' })
  urlMovie: string;

  @IsString()
  @ApiProperty({ example: 'https://partitura.com', description: 'O link do partitura' })
  urlSheetMusic: string;
}
