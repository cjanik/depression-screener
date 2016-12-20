const initialState = {
  testStatus: 'prompt',
  selectectedTest: '',
  currentQuestion: null,
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
      // questions are assumed scoreless when test is begun
      return {
        ...state,
        testStatus: 'inProgress',
        selectectedTest: action.payload.name,
        currentQuestion: 0,
        scores: {
          [action.payload.name]:
            Array(state.tests[action.payload.name].questions.length)
        }
      };
    case 'COMPLETE_TEST':
      return {
        ...state,
        testStatus: 'complete'
      };
    case 'ANSWER_QUESTION':
      // no requirement to answer every question is assumed,
      // unanwered questions will count 0
      const testName = state.selectectedTest;
      const testScores = [...state.scores[selectectedTest]];
      const questionNumber = state.currentQuestion;

      if (typeof questionNumber === 'number' &&
        (0 <= questionNumber < state.tests[testName].questions.length)
      ) {
        return {
          ...state,
          scores: {
            ...state.scores,
            [testName]: [
              ...testScores.slice(0, questionNumber || 1),
              action.payload.score,
              ...testScores.slice(questionNumber + 1)
            ]
          }
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export { initialState, reducer, validTestStatus };
