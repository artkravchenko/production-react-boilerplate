import React from 'react';
import { hot } from 'react-hot-loader';

import Header from 'web-client/src/shared/widgets/Header';

function Application() {
  return (
    <React.Fragment>
      <Header />
      <div>Hello world!</div>
    </React.Fragment>
  );
}

export default hot(module)(Application);
