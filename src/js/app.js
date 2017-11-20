import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';

import keenImage from '../assets/keen.png';
import Bean from 'ble-bean';
import axios from 'axios';

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello from react!!!
        push 6

        <img src={ keenImage } alt='Commander Keen' />
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));
