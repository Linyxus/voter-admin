import React from "react";
import PropTypes from "prop-types";
import constants from "../constants";
import {
  Grid,
  CircularProgress,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Switch
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

class OptionItem extends React.Component {
  componentDidMount() {
    const { option } = this.props;
    if (option === undefined || option.status === constants.COMMON.INVALID) {
      this.props.fetchOption();
    }
  }

  render() {
    const { option } = this.props;
    if (
      option === undefined ||
      option.status === constants.COMMON.INVALID ||
      option.status === constants.COMMON.FETCHING
    ) {
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
        <Avatar alt="1" src={option.image} />
        <ListItemText primary={option.title} secondary={`by ${option.owner}`} />
        <ListItemSecondaryAction>
          <Switch 
            checked={this.props.checked}
            disabled={!this.props.parentChecked}
            onChange={(e, c) => this.props.toggle()} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

OptionItem.propTypes = {
  option: PropTypes.object.isRequired,
  fetchOption: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  parentChecked: PropTypes.bool.isRequired,
};

export default OptionItem;
