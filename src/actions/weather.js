export const setDefaultLocation = (location) => {
  return {type: 'SET_DEFAULT_LOCATION', value: location};
};

export const addFavorite = (location) => {
  return {type: 'ADD_FAVORITE', value: location};
};

export const removeFavorite = (location) => {
  return {type: 'REMOVE_FAVORITE', value: location};
};
