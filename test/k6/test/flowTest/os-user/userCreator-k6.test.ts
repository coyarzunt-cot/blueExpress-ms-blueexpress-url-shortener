// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { check, sleep, group } from 'k6';
// @ts-ignore
import { URL_BASE_DEVELOP, URL_BASE_LOCAL_USER, URL_BASE_LOCAL, DATA_OPTIONS } from '../../../config/k6-configuration.ts';
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
//import { htmlReport } from '../dist/bundle.js'
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
// @ts-ignore
import { makeCod, randomData, getRandomIntInclusive, randomRut, getDigitoVerificador } from '../../../util/util.randomData.ts';

let url;
let urlCompany;
// @ts-ignore
switch (__ENV.environment.toLowerCase()) {
  case 'local':
    url = `${URL_BASE_LOCAL_USER}/osforall/os-user/`;
    break;
  case 'develop':
    url = `${URL_BASE_DEVELOP}/osforall/client/`;
    break;
  default:
    url = `${URL_BASE_LOCAL}/osforall/client/`;
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
    console.log("handleSummary==============================================", data);
    return {
        'C:\\COT\\proyectos\\osforall\\ms\\osforall-api-main\\docs\\performance\\clientCreatorsummary.html': htmlReport(data, { debug: false }),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    }

    
}*/

export default function () {
  let restUser;
  group('os-User: create User', function () {
    restUser = saveUser();
    console.log('restUser', restUser);
  });

  sleep(1);

  return;
}

export function saveUser() {
  const rut = randomRut();
  const dv = getDigitoVerificador(rut);
  let userDTO = {
    rut: rut,
    address: randomData('address'),
    dv: dv,
    branchOfficeId: 1,
    email: randomData('email'),
    names: randomData('names'),
    rolModuleId: 1,
    surnameMaternal: randomData('lastname'),
    surnamePaternal: randomData('lastname'),
  };
  const urlUser = url + 'user/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(urlUser, JSON.stringify(userDTO), params);

  check(res, {
    'User post saveUser': (r) => r.status === 200 || r.status === 201,
  });
  return JSON.parse(res.body);
}
