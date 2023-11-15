import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    AuthModule, 
    UsersModule,
    // TypeOrmModule.forRoot({
    //   type: process.env.DB_TYPE as 'postgres', // Cast necessário para o tipo 'postgres'
    //   host: process.env.DB_HOST,
    //   port: +process.env.DB_PORT, // O sinal de + converte a string para número
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: process.env.DB_SYNCHRONIZE === 'true', // Converte string para boolean
    //   ssl: {
    //     rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false' // Converte string para boolean
    //   }
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-white-moon-57284451-pooler.us-east-1.postgres.vercel-storage.com',
      port: 5432,
      username: 'default',
      password: 'mJW9Vf0uSRhZ',
      database: 'verceldb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Não usar em produção!
      ssl: {
        rejectUnauthorized: false
      }
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true, // Não usar em produção!
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
