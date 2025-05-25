import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup() {
    // call authService.signup function
    return this.authService.signup();
  }

  @Post('login')
  login() {
    // call authService.login function
    return this.authService.login();
  }

  @Post('refresh')
  refresh() {
    // call authService.refreshTokens function
    return this.authService.refreshTokens();
  }
}
