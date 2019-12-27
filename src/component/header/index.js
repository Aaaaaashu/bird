import React, { Component } from 'react'
import './index.css'

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="header-title">Bird</h1>
        <p className="header-desc">Send a bird message</p>
      </div>
    );
  }
}


