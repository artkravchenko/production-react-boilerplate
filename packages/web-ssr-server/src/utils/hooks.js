if (process.env.NODE_ENV !== 'production') {
  const registerBabelHook = require('@babel/register');

  registerBabelHook({
    babelrc: false,
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      'babel-plugin-transform-es2015-modules-commonjs',
    ],
  });
}
