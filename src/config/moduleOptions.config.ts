import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import databaseEnvConfig from './databaseEnv.config';

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
    USER: Joi.string().required(),
    PASSWORD: Joi.string().required(),
    DATABASE: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    EMAIL_SERVICE: Joi.string().required(),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASSWORD: Joi.string().required(),
  }),
  load: [databaseEnvConfig],
  isGlobal: true,
};
