import { Module } from '@nestjs/common';
import { UrlBlueExpressModule } from './url-blue-express/url-blue-express.module';
import { HealthController } from './config/health.controller';

@Module({
  imports: [UrlBlueExpressModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
