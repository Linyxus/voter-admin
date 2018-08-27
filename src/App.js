import React, { Component } from 'react';
import MyAppBar from './components/MyAppBar';
import { CssBaseline } from '@material-ui/core';
import Root from './containers/Root';
import AuthOnStartup from './components/AuthOnStartup';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AuthOnStartup />
        <MyAppBar 
          content={<Root />}/>
      </React.Fragment>
    );
  }
}

export default App;
