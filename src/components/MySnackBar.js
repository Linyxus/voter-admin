import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { closeSnackbar } from '../action';

class MySnackbar extends React.Component {

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.open}
          autoHideDuration={this.props.duration}
          onClose={this.props.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.text}</span>}
        />
      </div>
    );
  }
}

MySnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.snackBar;
const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeSnackbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MySnackbar);
