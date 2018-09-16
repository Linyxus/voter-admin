import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 600
  },
  grow: {
    flexGrow: 1
  },
  icon: {
    marginRight: 16
  }
});

const PollCard = (props) => {
  const { classes, theme } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Grid container spacing={theme.spacing.unit}>
          <Grid item className={classes.grow}>
            <Typography variant="title">
              The Title of The poll
            </Typography>
          </Grid>
          <Grid item>
            <Switch color="primary"/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">
              New option | by nonozone
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="p">
              Check or uncheck the switches to determine whether the whole poll of the single
              option is valid. Click commit to apply the validation.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">
              Options
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              <ListItem dense button>
                <Avatar alt="1" src="~/1.jpg"/>
                <ListItemText primary="Option" secondary="by someone" />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem dense button>
                <Avatar alt="1" src="~/1.jpg"/>
                <ListItemText primary="Option" secondary="by someone" />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
            >
              <CloudUploadIcon className={classes.icon}/>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

PollCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(PollCard);