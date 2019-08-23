export const getters = {
  elemOfType: state => (type, slug) => {
    return state.types[type] && state.types[type][slug]
      ? state.types[type][slug]
      : null;
  }
};
