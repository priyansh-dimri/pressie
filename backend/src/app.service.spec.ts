import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should return health status', () => {
    expect(service.getHealthStatus()).toEqual(
      'Pressie backend is running properly',
    );
  });
});
