// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { sleep, check } from 'k6';
// @ts-ignore
import runTestCompany from './flowTest/os-company/companyCreator-k6.test.ts';

// @ts-ignore
import runTestCreateOrderOnline from './flowTest/os-order-online-creator/orderOnlineCreator-k6.test.ts';
// @ts-ignore
import runTestUser from './flowTest/os-user/userCreator-k6.test.ts';
// @ts-ignore
import runTestOne from './client/clientCreator-k6.test.ts';
// @ts-ignore
import runTestTwo from './basicTypes/basicTypes-k6.test.ts';

// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
//import { htmlReport } from '../dist/bundle.js'
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export default function () {
  let resultCompany = runTestCompany();
  console.log('resultCompany==============================================', resultCompany);
  let resultCreateOrderOnline = runTestCreateOrderOnline();
  let rerusltUser = runTestUser();
  runTestTwo(null);
}

export function handleSummary(data) {
  console.log('handleSummary==============================================', data);
  return {
    'C:\\COT\\proyectos\\osforall\\ms\\osforall-api-main\\docs\\performance\\flowTest.html': htmlReport(data, { debug: false }),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
