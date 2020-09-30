const initialState = {
  darkMode: 'light',
  metric: 'Metric',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE': {
      return Object.assign({}, state, {
        darkMode: state.darkMode === 'dark' ? 'light' : 'dark',
      });
    }
    case 'TOGGLE_METRIC': {
      return Object.assign({}, state, {
        metric: state.metric === 'Metric' ? 'Imperial' : 'Metric',
      });
    }

    default:
      return state;
  }
};

export default settingsReducer;
