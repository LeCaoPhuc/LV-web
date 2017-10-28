import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  PARSE_SERVER_URL: 'http://localhost:3778/socialobe-api',
  PARSE_SERVER_URL_HTTPS: 'https://localhost:3778/socialobe-api',
  APP_ID: 'Socialobe-Test-APPID'
};

export = DevConfig;

