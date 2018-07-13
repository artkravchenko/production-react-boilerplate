function getAssets(isDevelopment) {
  let scripts;

  if (isDevelopment) {
    scripts = ['/assets/vendor.js', '/assets/app.js'];
  } else {
    scripts = ['/assets/app.js'];
  }

  return {
    scripts,
  };
}

const isDevServerEnabled = process.env.WEBPACK_ENABLE_DEV_SERVER === '1';

export function renderMiddleware(req, res, next) {
  if (res.headersSent) {
    return next();
  }

  return res.status(200).render('index', {
    assets: getAssets(isDevServerEnabled),
  });
}
