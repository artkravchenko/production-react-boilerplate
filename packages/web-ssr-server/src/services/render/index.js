import { isPlainObject } from 'lodash';

import { getRenderingSteps } from './steps';

function extend(locals, val) {
  // FIXME: ensure `val` is non-object or plain object
  // (not an array or smth) statically to simplify the condition
  if (!isPlainObject(val)) {
    return locals;
  }

  return Object.assign({}, locals, val);
}

function iterateRender(locals, steps, bag) {
  if (!steps.length) {
    return locals;
  }

  const res = steps[0](locals, bag);

  if (res && typeof res.then === 'function') {
    return res.then(val => {
      return iterateRender(extend(locals, val), steps.slice(1), bag);
    });
  }

  return iterateRender(extend(locals, res), steps.slice(1), bag);
}

export function createRenderMiddleware() {
  const steps = getRenderingSteps();

  return (req, res, next) => {
    const initialLocals = {
      ...res.app.locals,
      ...res.locals,
    };

    return iterateRender(initialLocals, steps, { req, res, next });
  };
}
