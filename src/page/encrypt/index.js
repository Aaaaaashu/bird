import React, { Component } from 'react'
import FlipCard from 'react-card-flip'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import cogoToast from 'cogo-toast'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import './index.css'
import QRCode from  '../../component/qrcode'
import * as crypto from '../../utils/crypto'

export default class Encrypt extends Component {
  state = {
    message: '',
    pubKey: '',
    encryptedMessage: '',
    isFlipped: false,
    isQrCode: false,
  }

  encryptMessage = async (message, pubKey) => {
    if (!message) return cogoToast.warn('请输入信息')
    if (!pubKey) return cogoToast.warn('请输入对方的 Bird ID')
    try {
      const encryptedMessage = await crypto.encrypt(message, pubKey)
      this.setState({  encryptedMessage, isFlipped: true, isQrCode: true })
    } catch(error) {
      cogoToast.error(error.message)
    }
  }

  renderEncryptedMessage(encryptedMessage, isQrCode) {
    if (isQrCode) {
      return <QRCode value={encryptedMessage} />
    } else {
      return <div className="encrypted-message">{encryptedMessage}</div>
    }
  }

  handleShare = () => {

  }

  render() {
    const { message, pubKey, isFlipped, isQrCode, encryptedMessage } = this.state

    return (
      <FlipCard isFlipped={isFlipped}>
        <div className="card-white">
          <TextField
            label="Message"
            multiline
            rows="4"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            onChange={e => this.setState({ message: e.target.value })}
          />
          <TextField 
            required 
            label="Bird ID" 
            variant="outlined"
            fullWidth={true}
            margin="normal"
            onChange={e => this.setState({ pubKey: e.target.value })}
          />

          <Button 
            variant="contained" 
            fullWidth={true}
            size="large"
            onClick={() => this.encryptMessage(message, pubKey)}
          >
            Encrypt
          </Button>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Encrypted Message</h2>
            <p className="card-contennt">Please send the encrypted message to your friend for decryption</p>
          </div>
          {this.renderEncryptedMessage(encryptedMessage, isQrCode)}
          <Grid container spacing={1}> 
            <Grid item xs={6}>
              <CopyToClipboard text={encryptedMessage}  onCopy={() => cogoToast.success('Copy sucess')}>
                <Button variant="contained" size="large">Copy</Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" size="large" onClick={this.handleShare}>Share</Button>
            </Grid>
          </Grid>
    
          <Button onClick={() => this.setState({ isFlipped: false })}>Back</Button>
        </div>
      </FlipCard>
    )
  }
}
