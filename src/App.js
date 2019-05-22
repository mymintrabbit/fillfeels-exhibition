import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css'
import 'antd-mobile/dist/antd-mobile.css'
import BottomTab from './components/BottomTab'
import { Routes } from './routes'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    font-family: 'Helvetica', sans-serif !important;
    font-weight: bold !important;
    font-size: 16px !important;
    line-height: 1.5;

    margin: 0;
    padding: 0;
  }
 
`

class App extends Component {
  state = {
    selectedTab: 'redTab',
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>{Routes}</Switch>
          {/* <BottomTab /> */}
        </div>
        <GlobalStyle />
      </Router>
    )
  }
}

export default App
