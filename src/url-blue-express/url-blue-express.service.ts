import { BadRequestException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { isURL } from 'class-validator';
import { nanoid } from 'nanoid';
import { ShortenURLDto } from './dtos/url-blue-express.dto';
import { UrlBlueExpressRepository } from './url-blue-express.repository';
import { UrlBEInterface } from './url-blue-express.interface';

@Injectable()
export class UrlBlueExpressService {
  constructor(private repo: UrlBlueExpressRepository) {}

  async createUrl(url: ShortenURLDto) {
    const { longUrl } = url;

    //checks if longurl is a valid URL
    if (!isURL(longUrl)) {
      throw new BadRequestException('String Must be a Valid URL');
    }

    try {
      //check if the URL has already been shortened
      let url = await this.repo.findOneBy(longUrl);
      console.log('shortenUrl findOneBy url', url);
      //return it if it exists
      if (url) return url.shortUrl;

      const urlCode = nanoid(6);
      const baseURL = process.env.URL_BASE;
      const shortUrl = `${baseURL}/${urlCode}`;

      const urlBEInterface: UrlBEInterface = {
        urlId: urlCode,
        longUrl: longUrl,
        shortUrl: shortUrl,
        countRedirect: 0,
      };

      //if it doesnt exist shorten it
      url = await this.repo.create(urlBEInterface);
      console.log('shortenUrl url', url);
      return urlBEInterface.shortUrl;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
  }

  async delete(urlId: string) {
    try {
      const responseFindId = await this.repo.findOneId(urlId);
      console.debug('delete responseFindId', responseFindId);
      if (responseFindId) {
        //check if the URL has already been shortened
        let responseDelete = await this.repo.delete(urlId);
        console.log('delete responseDelete', responseDelete);
        if (Object.keys(responseDelete).length === 0) {
          console.log('No properties');
          return 'Delete correct';
        }
        return 'Delete not work';
      }
      throw new NotFoundException('Resource Not Found');
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
  }

  async getLongUrl(urlCode: string) {
    try {
      const response = await this.repo.findOneId(urlCode);
      console.log('redirect response', response);
      if (response) {
        // let countRedirect = response.countRedirect;
        await this.repo.update(response.urlId, ++response.countRedirect);
        return response.longUrl;
      }
      throw new NotFoundException('Resource Not Found');
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Resource Not Found');
    }
  }

  async getDataUrl(urlCode: string) {
    try {
      const response = await this.repo.findOneId(urlCode);
      console.log('getDataUrl response', response);
      if (response) {
        return response;
      }
      throw new NotFoundException('Resource Not Found');
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Resource Not Found');
    }
  }

  async getList(limit: number, startKey: string) {
    try {
      const response = await this.repo.getList(limit, startKey);
      console.log('redirect response', response);
      if (response) {
        return response;
      }
      throw new NotFoundException('Resource Not Found');
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Resource Not Found');
    }
  }
}
