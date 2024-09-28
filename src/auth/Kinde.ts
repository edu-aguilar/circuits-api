import { GrantType, setupKinde } from '@kinde-oss/kinde-node-express';
import { ConfigService } from '@nestjs/config';
import type { Express } from 'express';

export class Kinde {
  private readonly kindeConfig;

  constructor(configService: ConfigService) {
    this.kindeConfig = {
      clientId: configService.get<string>('KINDE_CLIENT_ID'),
      secret: configService.get<string>('KINDE_CLIENT_SECRET'),
      issuerBaseUrl: configService.get<string>('KINDE_DOMAIN'),
      siteUrl: configService.get<string>('KINDE_SITE_URL'),
      redirectUrl: configService.get<string>('KINDE_REDIRECT_URL'),
      scope: 'openid profile email',
      grantType: GrantType.PKCE,
      unAuthorisedUrl: configService.get<string>('KINDE_UNAUTHORIZED_URL'),
      postLogoutRedirectUrl: configService.get<string>(
        'KINDE_LOGOUT_REDIRECT_URI',
      ),
    };
  }

  setup(expressApp: Express) {
    setupKinde(this.kindeConfig, expressApp);
  }
}
