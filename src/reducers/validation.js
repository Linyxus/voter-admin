import { FETCH_LIST_SUCCEED, TOGGLE_OPTION, TOGGLE_POLL } from "../action";
import u from "updeep";

const validation = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LIST_SUCCEED:
      return Object.assign(
        {},
        state,
        action.polls.reduce(
          (acc, cur) =>
            Object.assign({}, acc, {
              [cur.id]: {
                validated: true,
                options: cur.options.reduce(
                  (acc2, cur2) => Object.assign({}, acc2, { [cur2]: true }),
                  {}
                )
              }
            }),
          {}
        )
      );
    case TOGGLE_POLL:
      return u({
        [action.id]: {
          validated: x => !x
        }
      }, state);
    case TOGGLE_OPTION:
      return u({
        [action.pollId]: {
          options: {
            [action.optionId]: x => !x
          }
        }
      }, state);
    default:
      return state;
  }
};

export default validation;
