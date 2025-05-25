import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup(): string {
    return 'signed in';
  }

  login(): string {
    return 'logged in';
  }

  refreshTokens() {
    return 'tokens refreshed';
  }
}
