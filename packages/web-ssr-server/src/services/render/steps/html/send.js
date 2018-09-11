export function sendHTML(locals, bag) {
  if (bag.res.headersSent) {
    return;
  }

  return bag.res.send(locals.html);
}
