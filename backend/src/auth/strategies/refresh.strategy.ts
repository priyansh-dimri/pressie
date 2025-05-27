import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';
import { Request } from 'express';
import { extractRefreshToken } from 'src/common/utils/extract-refresh-token';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const secret = configService.get<string>('JWT_REFRESH_SECRET', {
      infer: true,
    });

    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not set');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => extractRefreshToken(req),
      ]),
      secretOrKey: secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = extractRefreshToken(req);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token Missing');
    }

    const isValid = await this.authService.validateRefreshToken(
      payload.sub,
      refreshToken,
    );

    if (!isValid) {
      throw new UnauthorizedException('Refresh Token Invalid');
    }

    return { userId: payload.sub, role: payload.role, refreshToken };
  }
}
