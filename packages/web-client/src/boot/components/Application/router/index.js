import PropTypes from 'prop-types';
import React from 'react';

import * as routes from './routes';

function getRoute(routeName) {
  return routes[routeName];
}

function ApplicationRouter(props) {
  const Route = getRoute(props.routeName);

  if (!Route) {
    return false;
  }

  return <Route />;
}

ApplicationRouter.propTypes = {
  routeName: PropTypes.string,
};

export default ApplicationRouter;
