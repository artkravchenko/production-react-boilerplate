import fs from 'fs';

import defaults from 'shared/src/features/env/defaults';
import { createSubenv } from 'shared/src/features/env/sub';

function createResolveAssetPath(publicPath) {
  return filename => `${publicPath}${filename}`;
}

function createHasAssetExtension(ext) {
  return asset => asset.name.endsWith(ext);
}

function compareScriptsOrder(a, b) {
  const scriptsOrder = ['manifest', 'vendor', 'app'];

  const aOrder = scriptsOrder.indexOf(a.chunkNames[0]);
  const bOrder = scriptsOrder.indexOf(b.chunkNames[0]);

  return aOrder - bOrder;
}

function getAssetFilename(asset) {
  return asset.name;
}

function getScriptAssets(assets) {
  const scriptAssets = assets.filter(createHasAssetExtension('.js'));

  if (process.env.WEBPACK_ENABLE_DEV_SERVER === '1') {
    scriptAssets.push({
      chunkNames: ['vendor'],
      name: 'vendor.js',
    });
  }

  const sortedScriptAssets = scriptAssets.slice().sort(compareScriptsOrder);
  const scriptFilenames = sortedScriptAssets.map(getAssetFilename);

  return scriptFilenames;
}

function getStyleAssets(assets) {
  const styleAssets = assets.filter(createHasAssetExtension('.css'));
  const styleFilenames = styleAssets.map(getAssetFilename);

  return styleFilenames;
}

function createGetAssets(stats) {
  return () => {
    const scripts = getScriptAssets(stats.assets);
    const styles = getStyleAssets(stats.assets);

    return {
      scripts: scripts.map(createResolveAssetPath(stats.publicPath)),
      styles: styles.map(createResolveAssetPath(stats.publicPath)),
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
