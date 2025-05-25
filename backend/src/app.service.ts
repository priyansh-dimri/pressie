import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthStatus(): string {
    return 'Pressie backend is running properly';
  }
}
