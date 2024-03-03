// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { check, sleep, group } from 'k6';
// @ts-ignore
import { URL_BASE_DEVELOP, URL_BASE_LOCAL_CLIENT, URL_BASE_LOCAL, DATA_OPTIONS } from '../../config/k6-configuration.ts';
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
//import { htmlReport } from '../dist/bundle.js'
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';
// @ts-ignore
import { getDigitoVerificador, randomData, randomRut } from '../../util/util.randomData.ts';
let url;
// @ts-ignore
switch (__ENV.environment.toLowerCase()) {
  case 'local':
    url = `${URL_BASE_LOCAL_CLIENT}/osforall/client/`;
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
  let client;
  group('get post', function () {
    client = createDataToSave();
    saveClient(client);

    sleep(1);
    (client.mobileNumber = randomData('mobileNumber')), (client.names = randomData('names'));

    updateClient(client);
    getClient(client);
    getLimit();
  });

  return client;
}

export function createDataToSave() {
  let rut = randomRut();
  let dv = getDigitoVerificador(rut.toString());

  let client = {
    rut: rut,
    dv: dv,
    names: randomData('names'),
    surnamePaternal: randomData('lastname'),
    surnameMaternal: randomData('lastname'),
    dateBirth: randomData('dateBirth'),
    gender: randomData('gender'),
    mobileNumber: randomData('mobileNumber'),
    email: randomData('email'),
    communeCode: randomData('communeCode'),
    address: randomData('address'),
  };

  return client;
}

export function saveClient(client) {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(url, JSON.stringify(client), params);

  check(res, {
    'Client post saveClient': (r) => r.status === 200 || r.status === 201,
  });
}

export function updateClient(client) {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.put(url, JSON.stringify(client), params);
  check(res, {
    'Client put updateClient': (r) => r.status === 200,
  });
}

export function getClient(client) {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.get(url + client.rut, params);
  check(res, {
    'Client get getClient': (r) => r.status === 200,
  });
}

export function getLimit() {
  const page = 1;
  const limit = 5;
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.get(url + 'pagination?pageqwqw=' + page + '&limit=' + limit, params);
  check(res, {
    'Client get getLimit': (r) => r.status === 200,
  });
}
