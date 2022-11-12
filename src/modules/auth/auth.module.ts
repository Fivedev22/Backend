import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthController } from 'src/modules/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants, JwtStrategy } from 'src/modules/auth/jwt';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '60m' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
