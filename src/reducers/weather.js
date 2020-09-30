const initialState = {
  default: undefined,
  favorites: [],
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DEFAULT_LOCATION':
      return Object.assign({}, state, {default: action.value});
    case 'ADD_FAVORITE':
      const list = state.favorites;
      list.push(action.value);
      return Object.assign({}, state, {favorites: list});
    case 'REMOVE_FAVORITE':
      return Object.assign({}, state, {
        favorites: state.favorites.filter(
          (location) => location.Key !== action.value.Key,
        ),
      });

    default:
      return state;
  }
};

export default weatherReducer;
