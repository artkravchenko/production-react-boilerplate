if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  const registerBabelHook = require('@babel/register');

  const webSSRServerPath = path.join(__dirname, '../../');

  registerBabelHook({
    configFile: path.join(webSSRServerPath, 'resources/babel/babel.config.js'),
    ignore: [/node_modules\/(?!shared)/],
  });
}

function noop() {}

require.extensions['.css'] = noop;
