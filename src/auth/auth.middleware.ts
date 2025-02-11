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

    try {
      await this.handleProtectRoute(req, res);
      await this.handleGetUser(req, res);
      next();
    } catch (error) {
      next(new UnauthorizedException(error?.message || 'Unauthorized'));
    }
  }

  private handleProtectRoute(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      protectRoute(req, res, (error) => {
        if (error) {
          reject(new UnauthorizedException('Unauthorized: ' + error.message));
        } else {
          resolve();
        }
      });
    });
  }

  private handleGetUser(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      getUser(req, res, (error) => {
        if (error) {
          reject(new UnauthorizedException('Unauthorized: ' + error.message));
        } else {
          resolve();
        }
      });
    });
  }
}
