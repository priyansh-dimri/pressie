import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { hash, verify } from 'argon2';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(
    dto: SignupDto,
  ): Promise<{ id: string; email: string; role: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) throw new ConflictException('Email already registered');

    const hashedPassword = await hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
    });

    return { id: user.id, email: user.email, role: user.role };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const passwordValid = await verify(user.password, password);
    if (!passwordValid) return null;

    return user;
  }

  async login(user: { id: string; role: string }) {
    const payload: JwtPayload = { sub: user.id, role: user.role as Role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '20m' });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const hashedRefreshToken = await hash(refreshToken);
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: hashedRefreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  refreshTokens(userId: string, role: string) {
    const payload: JwtPayload = { sub: userId, role: role as Role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return { accessToken };
  }

  async validateRefreshToken(
    userId: string,
    rawToken: string,
  ): Promise<boolean> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: { userId },
    });

    for (const tokenEntry of tokens) {
      if (await verify(tokenEntry.token, rawToken)) return true;
    }

    return false;
  }

  async logout(userId: string, rawToken: string): Promise<void> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: { userId },
    });
    for (const t of tokens) {
      if (await verify(t.token, rawToken)) {
        await this.prisma.refreshToken.delete({ where: { id: t.id } });
        break;
      }
    }
  }
}
