import { Module } from '@nestjs/common';
import { UrlBlueExpressService } from './url-blue-express.service';
import { UrlBlueExpressController } from './url-blue-express.controller';
import { UrlBlueExpressRepository } from './url-blue-express.repository';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [],
  providers: [UrlBlueExpressService, UrlBlueExpressRepository],
  controllers: [UrlBlueExpressController],
})
export class UrlBlueExpressModule {}
