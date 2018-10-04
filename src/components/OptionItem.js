import React from 'react';
import PropTypes from 'prop-types';
import constants from '../constants';
import { Grid, ListItem, CircularProgress, Avatar, ListItemText, 
  ListItemSecondaryAction, Switch } from '@material-ui/core';

class OptionItem extends React.Component
{
  componentDidMount() {
    const { option } = this.props;
    if (option === undefined || option.status === constants.COMMON.INVALID) {
      this.props.fetchOption();
    }
  }

  render() {
    const { option } = this.props;
    if (option === undefined || option.status === constants.COMMON.INVALID
      || option.status === constants.COMMON.FETCHING) {
      return (
        <ListItem dense button>
          <Grid container alignItems="center" justify="center">
            <CircularProgress color="secondary" />
          </Grid>
        </ListItem>
      );
    }

    // status: NORMAL
    return (
      <ListItem dense button>
        <Avatar alt="1" src={option.image}/>
        <ListItemText primary={option.title} secondary={`by ${option.owner}`} />
        <ListItemSecondaryAction>
          <Switch />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

OptionItem.propTypes = {
  option: PropTypes.object.isRequired,
};

export default OptionItem;