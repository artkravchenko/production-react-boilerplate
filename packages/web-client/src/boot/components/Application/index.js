import React from 'react';
import { hot } from 'react-hot-loader';

import ApplicationRouter from './router';

function Application() {
  return <ApplicationRouter routeName="Main" />;
}

export default hot(module)(Application);
