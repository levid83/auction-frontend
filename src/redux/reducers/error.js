const errorReducer = (state, action) => {
  if (!action.error) {
    return {
      ...state,
      error: null,
    };
  }
  return {
    ...state,
    error: {
      message: action.payload.message ?? "An unexpected error occured",
    },
  };
};

export default errorReducer;
