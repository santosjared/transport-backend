import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import getConfig from 'src/config/environment'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:getConfig().token_Secret,
    });
  }

  async validate(payload) {
    console.log(payload)
    return { id: payload.id, _id:payload._id,name:payload.name, lastName: payload.lastName, rol:payload.rol };
  }
}