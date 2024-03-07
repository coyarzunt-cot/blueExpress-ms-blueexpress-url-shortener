export const DATA_OPTIONS = {
  SIMPLE: {
    iterations: 15000,
    vus: 1,
    maxDuration: '3m',
    duration: '10m',
  },
  COMPLEX: {
    //  iterations: 1,
   // vus: 10,
     rate: 20000,
    //   timeUnit: '1s',
    //   maxDuration: '1s',
    duration: '5m',
  },
};

export const URL_BASE_LOCAL = 'http://localhost:3000';
export const URL_BASE_DEVELOP = 'http://ELB-cot-blueexpress-1844851310.us-east-2.elb.amazonaws.com';
