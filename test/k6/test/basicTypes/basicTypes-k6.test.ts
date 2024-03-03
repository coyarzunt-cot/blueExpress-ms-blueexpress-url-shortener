// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { check } from 'k6';
// @ts-ignore
import { URL_BASE_DEVELOP, URL_BASE_LOCAL, DATA_OPTIONS } from '../../config/k6-configuration.ts';

let url;
// @ts-ignore
switch (__ENV.environment.toLowerCase()) {
  case 'local':
    url = `${URL_BASE_LOCAL}/buex/`;
    break;
  case 'develop':
    url = `${URL_BASE_DEVELOP}/buex/`;
    break;
  default:
    url = `${URL_BASE_LOCAL}/buex/`;
}

export const options = {
  // @ts-ignore
  vus: DATA_OPTIONS[__ENV.performace.toUpperCase()]['vus'],
  // @ts-ignore
  iterations: DATA_OPTIONS[__ENV.performace.toUpperCase()]['iterations'],
  // @ts-ignore
  duration: DATA_OPTIONS[__ENV.performace.toUpperCase()]['duration'],
  // @ts-ignore
  // maxDuration: DATA_OPTIONS[__ENV.performace.toUpperCase()]['maxDuration'],
};

export default function (params) {
  console.log('====TYPES=======> params', params);

  let res = http.get(url + 'longUrl/zI44OkkXX7');
  check(res, {
    'get longUrl is status 200': (r) => r.status === 200,
  });
}
