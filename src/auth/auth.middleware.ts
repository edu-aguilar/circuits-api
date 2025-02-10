import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getUser, protectRoute } from '@kinde-oss/kinde-node-express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    protectRoute(req, res, (error) => {
      if (error) {
        // this throws kills the API. investigate it
        throw new UnauthorizedException('Unauthorized', error.message);
      }

      getUser(req, res, (error) => {
        if (error) {
          // this throws kills the API. investigate it
          throw new UnauthorizedException('Unauthorized', error.message);
        }

        next();
      });
    });
  }
}
