export function renderMiddleware(req, res, next) {
  if (res.headersSent) {
    return next();
  }

  return res.status(200).render('index');
}
