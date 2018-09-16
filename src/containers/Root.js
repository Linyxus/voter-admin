import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import constants from '../constants';
import ValidationView from './ValidationView';

const Root = (props) => {
  if (props.page === constants.PAGE.OVERVIEW) {
    return <div>This page is under construction.</div>;
  }
  if (props.page === constants.PAGE.VALIDATION) {
    return <div><ValidationView /></div>;
  }
};

Root.propTypes = {
  page: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  page: state.page,
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Root);