import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Login from '../components/Login';
import constants from '../constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Typography } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    padding: 50
  },
};

const TabContainer = ({ children, dir }) => {
  return children;
}

class AuthView extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    if (this.props.authStatus === constants.AUTH.AUTHING 
        || this.props.authStatus === constants.AUTH.CHECKING) {
      return (
        <Paper className={classes.paper}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
              <CircularProgress />
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {this.props.authStatus === constants.AUTH.AUTHING ? 
                  'Logging in...' : 'Checking your identity...'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )
    }

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Sign up" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><Login login={this.props.login}/></TabContainer>
          <TabContainer dir={theme.direction}>Nothing can be done here.</TabContainer>
        </SwipeableViews>
      </Paper>
    );
  }
}

AuthView.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
};

export default withStyles(styles, {withTheme: true})(AuthView);
