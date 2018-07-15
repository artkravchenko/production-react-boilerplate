import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Writable } from 'stream';

import Application from 'web-client/src/boot/components/Application';

class HTMLStream extends Writable {
  buffer = '';

  _write(chunk, encoding, cb) {
    this.buffer += chunk;
    cb();
  }
}

function render(element, callback) {
  const htmlStream = new HTMLStream();

  htmlStream.on('error', callback);

  htmlStream.on('finish', () => {
    callback(null, {
      applicationHTML: htmlStream.buffer,
    });
  });

  const rendererStream = renderToNodeStream(element);

  rendererStream.on('error', e => {
    rendererStream.unpipe(htmlStream);
    callback(e);
  });

  rendererStream.pipe(htmlStream);
}

const renderAsync = Promise.promisify(render);

export function renderApplication(locals, bag) {
  if (bag.res.headersSent) {
    return;
  }

  return renderAsync(<Application />);
}
