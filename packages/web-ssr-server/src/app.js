import express from 'express';
import path from 'path';

import { renderMiddleware } from './services/render';

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

function createApplication() {
  const app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(
    express.static(path.join(__dirname, '../../web-client/build/public'))
  );

  if (process.env.ENABLE_WEBPACK_DEV_SERVER) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('web-client/resources/build/webpack/app.config.js');

    const compiler = webpack(webpackConfig);

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
      })
    );
  }

  app.get('*', renderMiddleware);

  return app;
}

export { createApplication };
