export const DATA_OPTIONS = {
  SIMPLE: {
    iterations: 1,
    vus: 10,
    maxDuration: '1m',
    duration: '30s',
  },
  COMPLEX: {
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'constant-arrival-rate',
  
        // How long the test lasts
        duration: '30s',
  
        // How many iterations per timeUnit
        rate: 30,
  
        // Start `rate` iterations per second
        timeUnit: '1s',
  
        // Pre-allocate VUs
        preAllocatedVUs: 50,
      },
    },
  },
};

export const URL_BASE_LOCAL = 'http://localhost:3000';
export const URL_BASE_DEVELOP = 'http://ELB-cot-blueexpress-1844851310.us-east-2.elb.amazonaws.com';
