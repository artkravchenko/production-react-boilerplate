import fs from 'fs';
import flushWebpackChunks from 'webpack-flush-chunks';

import defaults from 'shared/src/features/env/defaults';
import { createSubenv } from 'shared/src/features/env/sub';

function createResolveAssetPath(publicPath) {
  return filename => `${publicPath}${filename}`;
}

const AFTER_CHUNKS = ['app'];
const BEFORE_CHUNKS = ['manifest'];
const MISSING_BEFORE_SCRIPTS = ['vendor.js'];

function createGetAssets(stats) {
  return options => {
    const assets = flushWebpackChunks(stats, {
      after: AFTER_CHUNKS,
      before: BEFORE_CHUNKS,
      chunkNames: options.webpackChunkNames,
    });

    let scripts;

    if (process.env.WEBPACK_ENABLE_DEV_SERVER === '1') {
      scripts = assets.scripts
        .slice(0, 1)
        .concat(MISSING_BEFORE_SCRIPTS, assets.scripts.slice(1));
    } else {
      scripts = assets.scripts;
    }

    return {
      cssChunks: assets.cssHash,
      scripts: scripts.map(createResolveAssetPath(stats.publicPath)),
      styles: assets.stylesheets.map(createResolveAssetPath(stats.publicPath)),
    };
  };
}

function createGetProductionAssets() {
  const subenv = createSubenv(defaults);
  const statsPath = subenv(process.env.WEBPACK_CLIENT_STATS_PATH);
  const statsText = fs.readFileSync(statsPath, 'utf-8');
  const statsJSON = JSON.parse(statsText);

  return createGetAssets(statsJSON);
}

function createGetDevelopmentAssets(rawStats) {
  let stats;

  if (typeof rawStats.toJson === 'function') {
    stats = rawStats.toJson();
  } else {
    stats = rawStats;
  }

  return createGetAssets(stats);
}

export function createGetAssetsCreator() {
  if (process.env.WEBPACK_ENABLE_DEV_SERVER === '1') {
    return createGetDevelopmentAssets;
  }

  return createGetProductionAssets;
}
