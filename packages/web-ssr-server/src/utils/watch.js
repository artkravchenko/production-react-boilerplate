import chokidar from 'chokidar';
import path from 'path';

const packageSrcPath = path.join(__dirname, '..');

export function watchServer() {
  const watcher = chokidar.watch(packageSrcPath);
  return watcher;
}
