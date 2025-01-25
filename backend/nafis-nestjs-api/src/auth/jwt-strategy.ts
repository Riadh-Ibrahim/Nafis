/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity"
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: Repository<User>) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.userRepository.findOne({
        where: {
            id: id,
        }
    })

    if (!user) {
        throw new UnauthorizedException("login first to access this endpoint.");
    }

    return user;
  }
}