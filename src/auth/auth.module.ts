import { Module, Global, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';


@Global()
@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: "1234",
          signOptions: { expiresIn: '3600s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController]

})
export class AuthModule {}
