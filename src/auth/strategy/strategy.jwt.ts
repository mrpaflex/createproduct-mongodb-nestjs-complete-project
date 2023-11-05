import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { User } from "src/user/model/user.model";
//require('dotenv').config();

export interface JwtPayload{
    user: string
  }
  
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authservice: AuthService,
      private configService: ConfigService

      ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_SECRET'),
      });
    }
  
   
    async validate(payload: JwtPayload) {
     const user = await this.authservice.getUserjwt(payload.user);
     if (!user) {
          throw new UnauthorizedException();
  
     }
     return user
     
    }

  }