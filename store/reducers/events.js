import { SET_EVENTS } from '../actions/events';

const initialState = {
  loadedEvents: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        loadedEvents: action.events
      };
  }
  return state;
};
