import { getAssets } from '../assets';

export function render(locals, bag) {
  if (bag.res.headersSent) {
    return;
  }

  return bag.res.status(200).render('index', {
    assets: getAssets(),
  });
}
