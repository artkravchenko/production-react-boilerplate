const isDevServerEnabled = process.env.WEBPACK_ENABLE_DEV_SERVER === '1';

export function getAssets() {
  let scripts;

  if (isDevServerEnabled) {
    scripts = ['/assets/manifest.js', '/assets/vendor.js', '/assets/app.js'];
  } else {
    scripts = ['/assets/app.js'];
  }

  return {
    scripts,
  };
}
