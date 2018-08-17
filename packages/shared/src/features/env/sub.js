export function sub(str, dict) {
  if (!str || typeof str !== 'string') {
    return str;
  }

  return str.replace(/\$\{([^${}]*)\}/g, (_, name) => {
    if (!dict || !(name in dict)) {
      return '';
    }

    return dict[name];
  });
}

export function createSubenv(defaults) {
  let processEnv;

  if (defaults !== null && typeof defaults === 'object') {
    processEnv = { ...defaults, ...process.env };
  } else {
    processEnv = { ...process.env };
  }

  return str => sub(str, processEnv);
}
