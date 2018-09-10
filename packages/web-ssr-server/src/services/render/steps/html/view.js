export function renderView(locals, bag) {
  if (bag.res.headersSent) {
    return;
  }

  return bag.res.app
    .renderAsync('index', {
      applicationHTML: locals.applicationHTML,
      assets: locals.getAssets({
        webpackChunkNames: locals.webpackChunkNames,
      }),
    })
    .then(html => ({ html }));
}
