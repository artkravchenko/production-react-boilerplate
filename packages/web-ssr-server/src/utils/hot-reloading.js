function clearRequireCache(predicate) {
  for (
    let i = 0, ids = Object.keys(require.cache), l = ids.length, id;
    i < l;
    ++i
  ) {
    id = ids[i];

    if (predicate(id)) {
      delete require.cache[id];
    }
  }
}

const ssrServerFilenamePattern = /web-ssr-server\/src/;

function isServerFile(id) {
  return ssrServerFilenamePattern.test(id);
}

export function clearServerCache() {
  // eslint-disable-next-line no-console
  console.log('Started to clear web-ssr-server modules cache');

  clearRequireCache(isServerFile);

  // eslint-disable-next-line no-console
  console.log('Finished to clear web-ssr-server modules cache');
}
