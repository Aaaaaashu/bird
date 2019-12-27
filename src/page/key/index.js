import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import cogoToast from 'cogo-toast'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import './index.css'
import QRCode from '../../component/qrcode'
import * as crypto from '../../utils/crypto'

export default class Key extends Component {
  state = {
    pubKey: ''
  }

  componentDidMount() {
    const { pubKey } = this.generateKey()
    this.setState({ pubKey })
  }

  generateKey() {
    const sessionPubKey = sessionStorage.getItem('pubKey')
    const sessionPrivKey = sessionStorage.getItem('privKey')
    if (!sessionPubKey || !sessionPrivKey) {
      const { privKey, pubKey } = crypto.generateKeys()
      sessionStorage.setItem('pubKey', pubKey)
      sessionStorage.setItem('privKey', privKey)

      return { pubKey }
    } else {
      return { pubKey: sessionPubKey }
    }
  }

  handleShare = () => {

  }

  render() {
    const { pubKey } = this.state
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Bird ID</h2>
          <p className="card-content">{pubKey}</p>
        </div>
        <QRCode value={pubKey} />
        <Grid container spacing={1}> 
          <Grid item xs={6}>
            <CopyToClipboard text={pubKey}  onCopy={() => cogoToast.success('Copy sucess')}>
              <Button variant="contained" size="large">Copy</Button>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" size="large" onClick={this.handleShare}>Share</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}
