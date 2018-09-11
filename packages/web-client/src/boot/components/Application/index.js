import React from 'react';
import { hot } from 'react-hot-loader';

import ApplicationRouter from './router';

function toggleRouteName(name) {
  return name === 'Main' ? 'Docs' : 'Main';
}

class Application extends React.PureComponent {
  state = {
    routeName: 'Main',
  };

  handleClick = () => {
    this.setState(state => ({
      ...state,
      routeName: toggleRouteName(state.routeName),
    }));
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <ApplicationRouter routeName={this.state.routeName} />
      </div>
    );
  }
}

export default hot(module)(Application);
