import { Module } from '@nestjs/common';
import { UrlBlueExpressModule } from './url-blue-express/url-blue-express.module';

@Module({
  imports: [UrlBlueExpressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
