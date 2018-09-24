import { isExpired } from "../tools";
import { doLogout } from "../action";

const tokenChecker = store => next => action => {
  const refresh = localStorage.getItem('refresh');
  if (refresh && isExpired(refresh)) {
    store.dispatch(doLogout());
  }
  return next(action);
}

export default tokenChecker;