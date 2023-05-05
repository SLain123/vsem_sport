export const getCspRules = () => `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.yandex.ru *.youtube.com;
  img-src 'self' data: *;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com data: *;
  frame-src 'self' *.youtube.com;
  font-src 'self' data:;
  connect-src 'self' http: *.yandex.ru`;
