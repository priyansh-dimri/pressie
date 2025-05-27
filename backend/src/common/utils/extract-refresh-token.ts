import { Request } from 'express';

export function extractRefreshToken(req: Request): string | null {
  const cookies = req.cookies as { 'refresh-token'?: string };
  return cookies?.['refresh-token'] ?? null;
}
