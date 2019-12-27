import React, { Component } from 'react';
import './App.css';
import Encrypt from './page/encrypt'
import Decrypt from './page/decrypt'
import Key from './page/key'
import Tab from './component/tab'
import Header from './component/header'

export class App extends Component {

  state = {
    index: 1,
  }

  componentWillMount() {
    if (window.imToken) {
      window.imToken.callPromisifyAPI('navigator.configure', { navigatorColor: '#ffd439' }).catch(err => console.warn(err))
    }
  }

  renderPage(index) {
    if (index === 1) return <Encrypt />
    if (index === 2) return <Decrypt />
    if (index === 3) return <Key />
    return null
  }

  render() {
    const { index } = this.state
    return (
      <div className="App">
        <div className="App-container">
          <Header />
          {this.renderPage(index)}
          <Tab index={index} onChange={(page) => this.setState({ index: page })} />
        </div>
      </div>
    );
  }
}

export default App;
