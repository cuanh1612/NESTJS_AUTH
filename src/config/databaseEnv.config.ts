import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.POSTGRES_PORT,
}));
