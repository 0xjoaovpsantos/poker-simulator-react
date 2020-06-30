import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route component={App} path="/" />
  </BrowserRouter>
);

export default Routes;
