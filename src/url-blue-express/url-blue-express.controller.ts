import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UrlBlueExpressService } from './url-blue-express.service';
import { ShortenURLDto } from './dtos/url-blue-express.dto';

@Controller('buex')
export class UrlBlueExpressController {
  constructor(private service: UrlBlueExpressService) {}

  @Post()
  createUrl(@Body() url: ShortenURLDto) {
    console.log('=======> NEW REQUEST POST', url);
    return this.service.createUrl(url);
  }

  @Delete(':urlId')
  delete(@Param('urlId') urlId: string) {
    console.log('=======> NEW REQUEST DELETE urlId', urlId);
    return this.service.delete(urlId);
  }

  @Get(':urlId')
  async redirect(@Res() res, @Param('urlId') urlId: string) {
    console.log('=======> NEW REQUEST GET-redirect urlId:', urlId);
    const responseUrl = await this.service.getLongUrl(urlId);
    console.log('redirect response', responseUrl);
    return res.redirect(responseUrl);
  }

  @Get('longUrl/:urlId')
  async getLongUrl(@Param('urlId') urlId: string) {
    console.log('=======> NEW REQUEST GET-getLongUrl urlId:', urlId);
    const responseUrl = await this.service.getDataUrl(urlId);
    console.log('getLongUrl response', responseUrl);
    return responseUrl;
  }

  @Get('list/limit/:limit/startKey/:startKey')
  async getList(@Param('limit') limit: number, @Param('startKey') startKey: string) {
    console.log('=======> NEW REQUEST GET-getList');
    const responseUrl = await this.service.getList(limit, startKey);
    console.log('getLongUrl response', responseUrl);
    return responseUrl;
  }
}
