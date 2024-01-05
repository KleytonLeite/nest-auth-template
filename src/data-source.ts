import { DataSource } from 'typeorm';
import { Music } from './entity/music.entity'; // Importe suas entidades
import { Audit } from './entity/audit.entity';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'ep-white-moon-57284451-pooler.us-east-1.postgres.vercel-storage.com',
    port: 5432,
    username: 'default',
    password: 'mJW9Vf0uSRhZ',
    database: 'verceldb',
    entities: [Music, Audit, User],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false
    },
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});

