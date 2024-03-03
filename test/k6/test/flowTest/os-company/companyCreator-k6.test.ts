// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { check, sleep, group } from 'k6';
// @ts-ignore
import { URL_BASE_DEVELOP, URL_BASE_LOCAL_COMPANY, URL_BASE_LOCAL, DATA_OPTIONS } from '../../../config/k6-configuration.ts';
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
//import { htmlReport } from '../dist/bundle.js'
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
// @ts-ignore
import { makeCod, randomData, getRandomIntInclusive } from '../../../util/util.randomData.ts';

let url;
let urlCompany;
// @ts-ignore
switch (__ENV.environment.toLowerCase()) {
  case 'local':
    url = `${URL_BASE_LOCAL_COMPANY}/osforall/os-company/`;
    break;
  case 'develop':
    url = `${URL_BASE_DEVELOP}/osforall/os-company/`;
    break;
  default:
    url = `${URL_BASE_LOCAL}/osforall/os-company/`;
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
  let restCompany;
  group('os-Company: create Company', function () {
    restCompany = saveCompany();
    console.log('restCompany', restCompany);
    let restBranchOffice = saveBranchOffice(restCompany);
    console.log('restBranchOffice', restBranchOffice);
    let restCompanySystemModule = saveCompanySystemModule(restCompany);
    console.log('restCompanySystemModule', restCompanySystemModule);

    //  sleep(1);

    for (let i = 1; i <= 2; i++) {
      let restAttentionServiceCategory = saveAttentionServiceCategory(restCompany, 'Categoria ' + makeCod(1).toUpperCase() + getRandomIntInclusive(1, 100));
      for (let j = 1; j <= 2; j++) {
        saveAttentionService(restAttentionServiceCategory, 'Examen ' + makeCod(1).toUpperCase() + getRandomIntInclusive(1, 100), getRandomIntInclusive(10000, 100000));
      }
    }
  });

  // sleep(1);

  group('os-Company: create Attention Service Category', function () {
    for (let i = 1; i <= 2; i++) {
      let restAttentionServiceCategory = saveAttentionServiceCategory(restCompany, 'Categoria ' + makeCod(1).toUpperCase() + getRandomIntInclusive(1, 100));
      for (let j = 1; j <= 2; j++) {
        saveAttentionService(restAttentionServiceCategory, 'Examen ' + makeCod(1).toUpperCase() + getRandomIntInclusive(1, 100), getRandomIntInclusive(10000, 100000));
      }
    }
  });

  return true;
}

export function saveCompany() {
  let companyName = randomData('company') + getRandomIntInclusive(1, 10000);

  let company = {
    name: companyName,
    domainSufix: companyName.substring(1, 3),
  };
  const urlCompany = url + 'company/v1/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(urlCompany, JSON.stringify(company), params);

  check(res, {
    'Company post saveCompany': (r) => r.status === 200 || r.status === 201,
  });

  if (res.status === 200 || res.status === 201) {
    return JSON.parse(res.body);
  }
  return null;
}

export function saveBranchOffice(company) {
  console.log('saveBranchOffice company', company);
  const branchOffice = {
    adress: randomData('address'),
    companyId: parseInt(company.id),
    name: 'Office ' + randomData('names'),
    communeCode: randomData('communeCode'),
  };
  console.log('saveBranchOffice branchOffice', branchOffice);
  const urlBranchOffice = url + 'branchOffice/v1/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(urlBranchOffice, JSON.stringify(branchOffice), params);

  check(res, {
    'Company post saveBranchOffice': (r) => r.status === 200 || r.status === 201,
  });
  return JSON.parse(res.body);
}

export function saveCompanySystemModule(company) {
  console.log('saveCompanySystemModule company', company);

  const companySystemModule = {
    typeModuleId: 1,
    typeSystemId: 'OS_ATTENTION_SERVICES',
    companyId: parseInt(company.id),
  };
  console.log('saveCompanySystemModule companySystemModule', companySystemModule);

  const urlCompanySystemModule = url + 'companySystemModule/v1/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(urlCompanySystemModule, JSON.stringify(companySystemModule), params);

  check(res, {
    'Company post saveCompanySystemModule': (r) => r.status === 200 || r.status === 201,
  });
  return JSON.parse(res.body);
}

export function saveAttentionServiceCategory(company, nameCategory) {
  console.log('saveAttentionServiceCategory company', company);

  const companySystemModule = {
    name: nameCategory,
    companyId: company.id,
  };
  console.log('saveAttentionServiceCategory companySystemModule', companySystemModule);

  const urlAttentionServiceCategory = url + 'attentionServiceCategory/v1/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(urlAttentionServiceCategory, JSON.stringify(companySystemModule), params);

  check(res, {
    'AttentionServiceCategory post saveAttentionServiceCategory': (r) => r.status === 200 || r.status === 201,
  });
  return JSON.parse(res.body);
}

export function saveAttentionService(attentionServiceCategory, nameService, amount) {
  console.log('saveAttentionService attentionServiceCategory', attentionServiceCategory);
  const attentionService = {
    name: nameService,
    attentionServiceCategoryId: attentionServiceCategory.id,
    amount: amount,
  };
  console.log('saveAttentionService attentionService', attentionService);

  const urlAttentionService = url + 'AttentionService/v1/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(urlAttentionService, JSON.stringify(attentionService), params);

  check(res, {
    'AttentionService post saveAttentionService': (r) => r.status === 200 || r.status === 201,
  });
  return JSON.parse(res.body);
}
