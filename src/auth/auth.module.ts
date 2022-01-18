import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, HttpModule, JwtModule.register({})],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
