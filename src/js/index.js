window.isEmpty = require('is-empty');

import React from 'react';
import ReactDOM from 'react-dom';
import SingleDatePicker from './SingleDatePicker';


ReactDOM.render(
  <div className='root-background'>
    <SingleDatePicker />
  </div>,
  document.getElementById('root')
);
