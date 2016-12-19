const initialState = {
  questions: {
    one: 'Do you feel depressed?'
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return {
        ...state,
        questions: [...state.questions, action.payload.question]
      };
    default:
      return state;
  }
};

export { initialState, reducer };
