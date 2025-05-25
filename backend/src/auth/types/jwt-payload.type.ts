import { Role } from '../role.enum';

export interface JwtPayload {
  sub: string;
  role: Role;
}
