import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import databaseEnvConfig from './databaseEnv.config';
import emailEnvConfig from './emailEnv.config';

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
    USER: Joi.string().required(),
    PASSWORD: Joi.string().required(),
    DATABASE: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
  }),
  load: [databaseEnvConfig, emailEnvConfig],
  isGlobal: true,
};
