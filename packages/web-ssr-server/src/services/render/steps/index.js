export function getRenderingSteps() {
  if (process.env.SSR_ENABLED !== '1') {
    return [require('./no-ssr').render];
  }

  return [
    require('./html/app').renderApplication,
    require('./html/view').renderView,
    require('./html/send').sendHTML,
  ];
}
