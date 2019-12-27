import React, { Component } from 'react';
import FlipCard from 'react-card-flip'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import cogoToast from 'cogo-toast'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './index.css';
import * as crypto from '../../utils/crypto'

export default class Decrypt extends Component {
  state = {
    encryptedMessage: '',
    message: '',
    isFlipped: false,
  }

  decrypttMessage = async (encryptedMessage) => {
    if (!encryptedMessage) cogoToast.warn('请输入加密信息')
    try {
      const sessionPrivKey = sessionStorage.getItem('privKey')
      const message = await crypto.decrypt(encryptedMessage, sessionPrivKey)
      this.setState({ message, isFlipped: true })
    } catch (error) {
      cogoToast.error(error.message)
    }
  }

  render() {
    const { isFlipped, message, encryptedMessage } = this.state

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
            onChange={e => this.setState({ encryptedMessage: e.target.value })}
          />
          <Button 
            variant="contained" 
            fullWidth={true}
            size="large"
            onClick={() => this.decrypttMessage(encryptedMessage)}
          >
            Decrypt
          </Button>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Plaintext</h2>
            <p className="card-contennt"></p>
          </div>
          <Card className="message">
            <CardContent>
              <Typography variant="h5" component="h2">
                {message}
              </Typography>
            </CardContent>
          </Card>
          <CopyToClipboard text={encryptedMessage}  onCopy={() => cogoToast.success('Copy sucess')}>
              <Button variant="contained" size="large">Copy</Button>
          </CopyToClipboard>
        </div>
      </FlipCard>
    )
  }
}
