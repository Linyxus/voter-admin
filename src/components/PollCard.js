import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import constants from "../constants";
import CheckIcon from "@material-ui/icons/Check";
import OptionItem from "./OptionItem";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 600,
    marginBottom: 10
  },
  loading: {
    marginBottom: 10,
    height: 300,
    width: "100%",
    maxWidth: 600
  },
  paper: {
    height: "100%"
  },
  grow: {
    flexGrow: 1
  },
  icon: {
    marginRight: 16
  }
});

class PollCard extends React.Component {
  componentDidMount() {
    // TODO: if the poll is not valid, load the poll data from server
    const { poll } = this.props;
    if (poll === undefined || poll.status === constants.POLL.INVALID) {
      this.props.fetchPoll();
    }
  }

  render() {
    const { classes, theme, poll } = this.props;
    // calculate the status
    const status = poll === undefined ? constants.POLL.INVALID : poll.status;

    if (
      status === constants.POLL.FETCHING ||
      status === constants.POLL.INVALID ||
      status === constants.POLL.VALIDATING
    ) {
      return (
        <div className={classes.loading}>
          <Paper className={classes.paper}>
            <Grid
              className={classes.paper}
              direction="column"
              container
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <CircularProgress />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  {status === constants.POLL.VALIDATING
                    ? "Submitting..."
                    : "Loading..."}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    }

    if (status === constants.POLL.FINISHED) {
      return (
        <div className={classes.loading}>
          <Paper className={classes.paper}>
            <Grid
              className={classes.paper}
              direction="column"
              container
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <CheckIcon color="secondary" />
              </Grid>
              <Grid item>
                <Typography variant="caption">Validated</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    }

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Grid container spacing={theme.spacing.unit}>
            <Grid item className={classes.grow}>
              <Typography variant="title">{poll.title}</Typography>
            </Grid>
            {poll["new_poll?"] && (
              <Grid item>
                <Switch
                  color="primary"
                  checked={this.props.validation.validated}
                  disabled={!(status === constants.POLL.NORMAL)}
                  onChange={(e, c) => this.props.toggle()}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="caption">
                {poll["new_poll?"] ? "New poll" : "New option"} | by{" "}
                {poll.owner}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="p">
                Check or uncheck the switches to determine whether the whole
                poll of the single option is valid. Click commit to apply the
                validation.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">Options</Typography>
            </Grid>
            <Grid item xs={12}>
              <List>
                {poll.options.map(id => {
                  return (
                    <OptionItem
                      key={id}
                      option={this.props.options[id]}
                      fetchOption={() => this.props.fetchOption(id)}
                      toggle={() => this.props.toggleOption(poll.id, id)}
                      parentChecked={this.props.validation.validated}
                      checked={this.props.validation.options[id] && this.props.validation.validated}
                    />
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" fullWidth onClick={this.props.validate}>
                <CloudUploadIcon className={classes.icon} />
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

PollCard.propTypes = {
  classes: PropTypes.object.isRequired,
  poll: PropTypes.shape({
    id: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.number).isRequired,
    owner: PropTypes.string,
    title: PropTypes.string,
    votes: PropTypes.arrayOf(PropTypes.number),
    created: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  options: PropTypes.object.isRequired,
  fetchOption: PropTypes.func.isRequired,
  fetchPoll: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  validation: PropTypes.shape({
    validated: PropTypes.bool.isRequired,
    options: PropTypes.object.isRequired
  }),
  toggle: PropTypes.func.isRequired,
  toggleOption: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(PollCard);
