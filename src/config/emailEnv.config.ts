import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  gmail: process.env.MAIL_USERNAME,
  clientId: process.env.MAIL_CLIENT_ID,
  clientSecret: process.env.MAIL_CLIENT_SECRET,
  refreshToken: process.env.MAIL_REFRESH_TOKEN,
  redirectUri: process.env.MAIL_REDIRECT_URI,
}));
