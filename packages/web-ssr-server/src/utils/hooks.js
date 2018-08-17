if (process.env.NODE_ENV !== 'production') {
  const registerBabelHook = require('@babel/register');

  registerBabelHook({
    babelrc: false,
    ignore: [/node_modules\/(?!shared)/],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      'babel-plugin-transform-es2015-modules-commonjs',
    ],
    presets: ['@babel/preset-react'],
  });
}
