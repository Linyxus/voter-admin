import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    marginTop: 20
  }
});

class Login extends React.Component {

  username = null;
  password = null;

  handleUsernameChange = e => {
    this.username = e.target.value;
  }

  handlePasswordChange = e => {
    this.password = e.target.value;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3" align="center">
            Login
          </Typography>
          <Typography component="p" align="center">
            Please provide your credientials to login.
          </Typography>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            onChange={this.handleUsernameChange} />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            autoComplete="current-password"
            onChange={this.handlePasswordChange} />
          <Button 
            variant="outlined" 
            color="primary" 
            className={classes.button} 
            fullWidth
            onClick={() => this.props.login(this.username, this.password)}
          >
            Login
          </Button>
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(Login);