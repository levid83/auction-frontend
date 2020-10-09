const errorActionCreator = (errorType, error) => {
  return {
    type: errorType,
    error: true,
    payload: typeof error === "string" ? new Error(error) : error,
  };
};
export default errorActionCreator;
