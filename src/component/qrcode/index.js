import React, { Component } from "react"
import QRCodeReact from 'qrcode.react'
import './index.css'

export default class QRCode extends Component {
  render() {
    const { value, size } = this.props
    return (
      <div className="qrcode-container">
        <QRCodeReact value={value} size={size || 160} />
      </div>
    )
  }
}