import express from 'express';
import http from 'http';

function createApplication() {
  const app = express();

  app.get('/hello', (req, res, next) => {
    if (res.headersSent) {
      return;
    }

    res.send('Hello, world!');
  });

  return app;
}

// logging
// cors
// errors?
// gzip
// http/2 priority
// accept-language
// i18n
// custom cookies (e.g. geolocation/country)
// statics
// react
// react-ssr?
// admin?

export { createApplication };
