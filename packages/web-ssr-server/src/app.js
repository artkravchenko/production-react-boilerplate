import express from 'express';
import path from 'path';

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

  if (process.env.WEBPACK_ENABLE_DEV_SERVER === '1') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('web-client/resources/build/webpack/app.config.js');

    const compiler = webpack(webpackConfig);

    compiler.hooks.done.tap('GetAssetsProvider', stats => {
      const { createGetAssetsCreator } = require('./services/render/assets');
      app.locals.getAssets = createGetAssetsCreator()(stats);
      app.locals.webpackStats = stats;
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
    const { createGetAssetsCreator } = require('./services/render/assets');
    app.locals.getAssets = createGetAssetsCreator()();
  }

  if (process.env.SSR_ENABLE_HMR === '1') {
    const { watchServer } = require('./utils/watch');
    const { clearServerCache } = require('./utils/hot-reloading');

    const watcher = watchServer();

    watcher.on('ready', () => {
      watcher.on('all', () => {
        clearServerCache();

        const { createGetAssetsCreator } = require('./services/render/assets');
        const getAssets = createGetAssetsCreator()(app.locals.webpackStats);
        app.locals.getAssets = getAssets;
      });
    });
  }

  if (process.env.SSR_ENABLE_HMR === '1') {
    app.get('*', (req, res, next) => {
      const render = require('./services/render').createRenderMiddleware();
      render(req, res, next);
    });
  } else {
    app.get('*', require('./services/render').createRenderMiddleware());
  }

  if (process.env.SSR_ENABLED === '1') {
    app.renderAsync = Promise.promisify(app.render, { context: app });
  }

  return app;
}

export { createApplication };
