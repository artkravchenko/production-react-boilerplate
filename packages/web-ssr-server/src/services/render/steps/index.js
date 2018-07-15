export function getRenderingSteps() {
  return [require('./no-ssr').render];
}
