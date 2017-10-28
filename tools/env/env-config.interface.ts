// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  API?: string;
  ENV?: string;
  PARSE_SERVER_URL?: string;
  PARSE_SERVER_URL_HTTPS?: string;
  APP_ID?: string;
  VERSION?: string;
}
