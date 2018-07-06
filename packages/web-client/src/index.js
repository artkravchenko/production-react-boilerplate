import React from 'react';
import ReactDOM from 'react-dom';

import Application from './boot/components/Application';

const applicationRootNode = document.getElementById('app');

ReactDOM.render(<Application />, applicationRootNode);
