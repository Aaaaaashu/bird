import React, { Component } from 'react';
import './index.css';

export default class Tab extends Component {
  render() {
    const { index, onChange } = this.props
    console.log(index);
    
    return (
      <div className="tab-container">
        <div className={`tab-item ${index === 1 ? 'active' : ''}`} onClick={() => onChange(1)}>
          <img src="encrypt.png" alt="encrypt"/>
          <span>Encrypt</span>
        </div>
        <div className={`tab-item ${index === 2 ? 'active' : ''}`} onClick={() => onChange(2)}>
          <img src="decrypt.png" alt="decrypt"/>
          <span>Decrypt</span>
        </div>
        <div className={`tab-item ${index === 3 ? 'active' : ''}`} onClick={() => onChange(3)}>
          <img src="decrypt.png" alt="key"/>
          <span>Key</span>
        </div>
      </div>
    );
  }
}


