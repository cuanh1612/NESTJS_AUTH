import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

const bullModuleConfig: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.get('REDIS_HOST'),
      port: Number(configService.get('REDIS_PORT')),
    },
  }),
  inject: [ConfigService],
};

export default bullModuleConfig;
