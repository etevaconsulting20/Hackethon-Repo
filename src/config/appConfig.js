
const dev = {
  SERVER_URL: "https://dev.api.2nd.gdn/v3",
  pdmUrl: 'https://dev.pdm.upids.io',
  b2cAppUrl: 'https://dev.upids.io/',
  // iamServerUrl: 'https://europe-west3-upids-v2.cloudfunctions.net/iam',
  iamServerUrl: 'https://prod.api.2nd.gdn/v3/iam',
  upidsMasterData: 'https://europe-west3-upids-v2.cloudfunctions.net/upidsmasterdata',
};

const qa = {
  SERVER_URL: "https://dev.api.2nd.gdn/v3",
  pdmUrl: 'https://dev.pdm.upids.io',
  b2cAppUrl: 'https://dev.upids.io/',
  // iamServerUrl: 'https://europe-west3-upids-v2.cloudfunctions.net/iam',
  iamServerUrl: 'https://prod.api.2nd.gdn/v3/iam',
  upidsMasterData: 'https://europe-west3-upids-v2.cloudfunctions.net/upidsmasterdata',
};

const prod = {
  SERVER_URL: "https://prod.api.2nd.gdn/v3",
  pdmUrl: 'https://pdm.upids.io',
  b2cAppUrl: 'https://upids.io/',
  // iamServerUrl: 'https://europe-west3-upids-v2.cloudfunctions.net/iam',
  iamServerUrl: 'https://prod.api.2nd.gdn/v3/iam',
  upidsMasterData: 'https://europe-west3-upids-v2.cloudfunctions.net/upidsmasterdata',
};

// const environment = (process && process.env.REACT_APP_ENV) ? process.env.REACT_APP_ENV : "dev"

// export const appConfig = {
//   // Add common appConfig values here
//   MAX_ATTACHMENT_SIZE: 5000000,
//   // Default to dev if not set
//   ...(environment === "prod" ? prod : environment === "qa" ? qa : dev),
// };

export const appConfig = {...dev}