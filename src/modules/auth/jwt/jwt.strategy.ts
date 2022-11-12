import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport';
import { JwtConstants } from "src/modules/auth/jwt/jwt.constants";
import { JwtPayload } from "src/modules/auth/jwt/jwt-payload";
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload) {
        const { username } = payload;
        const userFound = await this.userService.findByUsername(username);
        if (!userFound) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        return userFound;
    }
}