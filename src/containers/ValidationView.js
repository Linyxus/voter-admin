import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import constants from '../constants';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PollCard from '../components/PollCard';

const styles = {

}

const ValidationView = (props) => {
  const { classes } = props;

  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <PollCard />
    </Grid>
  )
}

ValidationView.PropTypes = {
  // polls: Polls data
  // validatePoll: the function to validate a poll
}

export default withStyles(styles)(ValidationView);