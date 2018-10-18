import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "../action";

const snackBar = (state = {open: false, text: 'Hello World', duration: 6000}, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {open: true, text: action.text, duartaion: action.duration};
    case CLOSE_SNACKBAR:
      return Object.assign({}, state, {open: false});
    default:
      return state;
  }
}

export default snackBar;