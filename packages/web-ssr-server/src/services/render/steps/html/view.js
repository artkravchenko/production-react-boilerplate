import { getAssets } from '../../assets';

export function renderView(locals, bag) {
  if (bag.res.headersSent) {
    return;
  }

  return bag.res.app
    .renderAsync('index', {
      applicationHTML: locals.applicationHTML,
      assets: getAssets(),
    })
    .then(html => ({ html }));
}
