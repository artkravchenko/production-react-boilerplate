import express from 'express';
import path from 'path';

import { createRenderMiddleware } from './services/render';
import { createGetAssetsCreator } from './services/render/assets/index';

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

  if (process.env.WEBPACK_ENABLE_DEV_SERVER === '1') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('web-client/resources/build/webpack/app.config.js');

    const compiler = webpack(webpackConfig);

    compiler.hooks.done.tap('GetAssetsProvider', stats => {
      app.locals.getAssets = createGetAssetsCreator()(stats);
    });

    app.use(
      webpackDevMiddleware(compiler, {
        hot: process.env.WEBPACK_ENABLE_HMR === '1',
        publicPath: webpackConfig.output.publicPath,
      })
    );

    if (process.env.WEBPACK_ENABLE_HMR === '1') {
      const webpackHotMiddleware = require('webpack-hot-middleware');

      app.use(
        webpackHotMiddleware(compiler, {
          heartbeat: 1000,
        })
      );
    }
  } else {
    app.locals.getAssets = createGetAssetsCreator()();
  }

  app.get('*', createRenderMiddleware());

  if (process.env.SSR_ENABLED === '1') {
    app.renderAsync = Promise.promisify(app.render, { context: app });
  }

  return app;
}

export { createApplication };
