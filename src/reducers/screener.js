const initialState = {
  testStatus: 'prompt',
  selectectedTest: '',
  tests: {},
  scores: {}
};

const validTestStatus = ['prompt', 'inProgress', 'complete'];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TEST':
      return {
        ...state,
        tests: {
          ...state.tests,
          [action.payload.test.name]: action.payload.test
        }
      };
    case 'BEGIN_TEST':
      return {
        ...state,
        testStatus: 'inProgress'
      };
    case 'COMPLETE_TEST':
      return {
        ...state,
        testStatus: 'complete',
        scores: {
          [state.selectectedTest]: action.payload.score
        }
      };
    case 'SELECT_TEST':
      return {
        ...state,
        selectectedTest: action.payload.testName
      };
    default:
      return state;
  }
};

export { initialState, reducer, validTestStatus };
