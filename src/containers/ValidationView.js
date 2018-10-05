import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import constants from '../constants';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PollCard from '../components/PollCard';
import { compose } from 'recompose';
import { CircularProgress } from '@material-ui/core';
import { fetchList, fetchPoll, fetchOption, togglePoll, toggleOption } from '../action';

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
              fetchOption={this.props.fetchOption}
              validation={this.props.validation[idx]}
              toggle={() => this.props.togglePoll(idx)}
              toggleOption={this.props.toggleOption} />
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
  }).isRequired,
  fetchList: PropTypes.func.isRequired,
  polls: PropTypes.object.isRequired,
  validation: PropTypes.object.isRequired,
  fetchPoll: PropTypes.func.isRequired,
  fetchOption: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  togglePoll: PropTypes.func.isRequired,
  toggleOption: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pollsList: state.pollsList,
  polls: state.polls,
  options: state.options,
  validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
  fetchPoll: (id) => dispatch(fetchPoll(id)),
  fetchOption: (id) => dispatch(fetchOption(id)),
  togglePoll: (id) => dispatch(togglePoll(id)),
  toggleOption: (pollId, optionId) => dispatch(toggleOption(pollId, optionId)),
});

export default compose(withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps))(ValidationView);