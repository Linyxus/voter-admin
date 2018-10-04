import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import constants from '../constants';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PollCard from '../components/PollCard';
import { compose } from 'recompose';
import { CircularProgress } from '@material-ui/core';
import { fetchList, fetchPoll, fetchOption } from '../action';

const styles = {

}

class ValidationView extends React.Component {
  componentDidMount() {
    const { pollsList } = this.props;
    if (pollsList.status === constants.COMMON.INVALID) {
      this.props.fetchList();
    }
  }

  render() {
    const { pollsList, options } = this.props;

    if (pollsList.status === constants.COMMON.INVALID
      || pollsList.status === constants.COMMON.FETCHING) {
      return (
        <Grid container alignItems="center" justify="center">
          <CircularProgress />
        </Grid>
      )
    }

    // pollsList.status === NORMAL
    return (
      <Grid container alignItems="center" justify="center" direction="column">
        {
          pollsList.list.map(idx => (
            <PollCard 
              key={idx} 
              poll={this.props.polls[idx]}
              fetchPoll={() => this.props.fetchPoll(idx)}
              options={options}
              fetchOption={this.props.fetchOption} />
          ))
        }
      </Grid>
    );
  }
}

ValidationView.propTypes = {
  // polls: Polls data
  // validatePoll: the function to validate a poll
  pollsList: PropTypes.shape({
    status: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  fetchList: PropTypes.func.isRequired,
  polls: PropTypes.object,
}

const mapStateToProps = state => ({
  pollsList: state.pollsList,
  polls: state.polls,
  options: state.options,
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
  fetchPoll: (id) => dispatch(fetchPoll(id)),
  fetchOption: (id) => dispatch(fetchOption(id)),
});

export default compose(withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps))(ValidationView);