export const getSuccessState = (state = false, action, trueTypes, falseTypes) => {
  if (trueTypes.indexOf(action.type) !== -1) {
    return true;
  }

  if (falseTypes.indexOf(action.type) !== -1) {
    return false;
  }

  return state;
};

export const getErrorState = (state = { value: false }, action, trueTypes, falseTypes) => {
  if (trueTypes.indexOf(action.type) !== -1) {
    return {
      error: action.error,
      value: true
    };
  }

  if (falseTypes.indexOf(action.type) !== -1) {
    return {
      value: false
    };
  }

  return state;
};