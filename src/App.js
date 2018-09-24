import React, { Component } from 'react';
import MyAppBar from './components/MyAppBar';
import { CssBaseline } from '@material-ui/core';
import Root from './containers/Root';
import { connect } from 'react-redux';
import constants from './constants';
import AuthView from './containers/AuthView';
import { loginAsSuperuser, doLogout, authSucceed } from './action';
import { isExpired } from './tools';

class App extends Component {
  componentDidMount() {
    const refresh = localStorage.getItem('refresh');
    const username = localStorage.getItem('username');
    if (refresh) { // token is saved
      if (isExpired(refresh)) { // expired token, delete
        this.props.doLogout();
      } else { // auto log in
        this.props.authSucceed(username);
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        { this.props.auth.status === constants.AUTH.AUTHED ? (
          <MyAppBar 
            content={<Root />}/>
        ) : (
          <AuthView login={this.props.login} authStatus={this.props.auth.status}/>
        )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(loginAsSuperuser(username, password)),
  doLogout: () => dispatch(doLogout()),
  authSucceed: (username) => dispatch(authSucceed(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
