import { Request } from 'express';

export function extractRefreshToken(req: Request): string | null {
  const cookies = req.cookies as { Refresh?: string };
  return cookies?.Refresh ?? null;
}
