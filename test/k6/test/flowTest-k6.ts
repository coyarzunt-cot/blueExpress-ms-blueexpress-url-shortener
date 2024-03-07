// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { sleep, check } from 'k6';
// @ts-ignore
import runTestTwo from './basicTypes/basicTypes-k6.test.ts';

// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
//import { htmlReport } from '../dist/bundle.js'
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export default function () {
  runTestTwo(null);
}

export function handleSummary(data) {
  console.log('handleSummary==============================================', data);
  return {
    'docs-k6-flowTest.html': htmlReport(data, { debug: false }),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
