import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.addEventListener('load', () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
});
