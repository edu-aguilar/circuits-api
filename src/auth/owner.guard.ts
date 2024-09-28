import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const access_token = request.session['access_token'];

    if (!access_token) {
      throw new ForbiddenException('Invalid token');
    }

    const decodedToken = jwt.decode(access_token);

    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new UnauthorizedException('Invalid token');
    }

    return decodedToken.permissions.includes('owner');
  }
}
