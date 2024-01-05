import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tb_music')
export class Music {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  slang: string;

  @Column({ nullable: true })
  tone: string;

  @Column({ nullable: true, name: 'url_cipher' })
  urlCipher: string;

  @Column({ nullable: true, name: 'url_letter' })
  urlLetter: string;

  @Column({ nullable: true, name: 'url_movie' })
  urlMovie: string;

  @Column({ nullable: true, name: 'url_sheet_music' })
  urlSheetMusic: string;
}

