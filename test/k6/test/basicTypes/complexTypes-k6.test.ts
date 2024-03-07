// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { sleep, check } from 'k6';
// @ts-ignore
import { URL_BASE_DEVELOP } from '../../config/k6-configuration.ts'

let url = `${URL_BASE_DEVELOP}/buex/`;

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',

      // How long the test lasts
      duration: '20s',

      // How many iterations per timeUnit
      rate: 1000,

      // Start `rate` iterations per second
      timeUnit: '1s',

      // Pre-allocate VUs
      preAllocatedVUs: 1010,
    },
  },
};

export default function () { 

 http.get(url + 'longUrl/sbH-sT');   // id de url existente en dynamodb
}
