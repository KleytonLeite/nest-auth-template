import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateMusicTable1704394992239 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE public.tb_music (
                id BIGSERIAL NOT NULL,
                author VARCHAR(255) NULL,
                "name" VARCHAR(255) NULL,
                slang VARCHAR(255) NULL,
                tone VARCHAR(255) NULL,
                url_cipher VARCHAR(255) NULL,
                url_letter VARCHAR(255) NULL,
                url_movie VARCHAR(255) NULL,
                url_sheet_music VARCHAR(255) NULL,
                CONSTRAINT tb_music_pkey PRIMARY KEY (id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE public.tb_music;`);
    }
}
