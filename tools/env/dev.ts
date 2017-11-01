import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  PARSE_SERVER_URL: 'http://localhost:3000/parse',
  PARSE_SERVER_URL_HTTPS: 'https://localhost:3000/parse',
  APP_ID: 'luan-van-app-id'
};

export = DevConfig;

