import React from 'react';
import { render, hydrate } from 'react-dom';

import Application from './boot/components/Application';

const applicationRootNode = document.getElementById('app');

let mount;

if (process.env.SSR_ENABLED === '1') {
  mount = hydrate;
} else {
  mount = render;
}

mount(<Application />, applicationRootNode);
