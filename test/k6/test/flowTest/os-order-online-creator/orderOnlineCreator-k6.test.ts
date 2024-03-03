// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { check, group } from 'k6';
// @ts-ignore
import { URL_BASE_DEVELOP, URL_BASE_LOCAL_OS_ONLINE_CREATOR, URL_BASE_LOCAL, DATA_OPTIONS } from '../../../config/k6-configuration.ts';

import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
//import { htmlReport } from '../dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
// @ts-ignore
import { saveAttentionService, saveAttentionServiceCategory } from '../os-company/companyCreator-k6.test.ts';
// @ts-ignore
import { makeCod, randomData, getRandomIntInclusive } from '../../../util/util.randomData.ts';

let url;
// @ts-ignore
switch (__ENV.environment.toLowerCase()) {
  case 'local':
    url = `${URL_BASE_LOCAL_OS_ONLINE_CREATOR}/osforall/os-order-online-creator/orderOnlineCreator/v1/`;
    break;
  case 'develop':
    url = `${URL_BASE_DEVELOP}/osforall/os-order-online-creator/orderOnlineCreator/v1`;
    break;
  default:
    url = `${URL_BASE_LOCAL}/osforall/os-order-online-creator/orderOnlineCreator/v1`;
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
/*
export function handleSummary(data) {
  console.log('handleSummary==============================================', data);
  return {
    'docsperfomancesummary.html': htmlReport(data, { debug: false }),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}*/
/*
export interface OrderOnlineCreatorCreateDto {
  userRutCreator: number;
  rutClient: number;
  rutApplicant: number;
  typeOrderOnlineId: number;
  companySendId: number;
  typeStateName: string;
  typeFlowName: string;
}

export let oocc: OrderOnlineCreatorCreateDto = {
  companySendId: 0,
  rutApplicant: 1,
  rutClient: 1,
  typeFlowName: "Ingreso de Orden de Creación",
  typeOrderOnlineId: 1,
  typeStateName: "Ingreso OC",
  userRutCreator: 1
}*/

export default function () {
  let restCompany;
  group('os-Order-Online-Creator: create Order Online Creator', function () {
    let oocc = createDataToSave();
    saveOrderOnlineCreator(oocc);
  });

  group('os-Company: create Attention Service Category', function () {
    for (let i = 1; i <= 2; i++) {
      let restAttentionServiceCategory = saveAttentionServiceCategory(restCompany, 'Categoria ' + makeCod(1).toUpperCase() + getRandomIntInclusive(1, 100));
      for (let j = 1; j <= 2; j++) {
        saveAttentionService(restAttentionServiceCategory, 'Examen ' + makeCod(1).toUpperCase() + getRandomIntInclusive(1, 100), getRandomIntInclusive(10000, 100000));
      }
    }
  });

  return;
}

export function createDataToSave() {
  let oocc = {
    companyId: 2,
    rutApplicant: 14123208,
    rutClient: 1003839,
    typeFlowName: 'Ingreso de Orden de Creación',
    typeOrderOnlineId: 1,
    typeStateName: 'Ingreso OC',
    userRutCreator: 14123207,
  };
  return oocc;
}

export function saveOrderOnlineCreator(oocc) {
  let res = http.post(url, oocc);
  console.log('saveOrderOnlineCreator', res);
  check(res, {
    'OrderOnlineCreator post saveOrderOnlineCreator': (r) => r.status === 200 || r.status === 201,
  });
}
