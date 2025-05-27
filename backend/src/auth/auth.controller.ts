import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { JwtPayload } from './types/jwt-payload.type';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const tokens = await this.authService.login({
      id: user.id,
      role: user.role,
    });

    res.cookie('refresh-token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Request() req: { user: JwtPayload & { refreshToken: string } }) {
    const tokens = this.authService.refreshTokens(
      req.user.sub,
      req.user.refreshToken,
    );

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Request() req: { user: JwtPayload & { refreshToken: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(req.user.sub, req.user.refreshToken);

    res.clearCookie('refresh-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return { message: 'Logged out' };
  }
}
