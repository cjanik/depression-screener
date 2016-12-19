import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import Prompt from './Prompt';
import Test from './Test';
import Result from './Result';

class IndexPage extends React.Component {
  componentWillMount() {
    this.props.onFetchTest();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tests) {
      console.log(nextProps.tests);
    }
  }
  renderChildByStatus(props) {
    switch (props.testStatus) {
      case 'prompt':
        return (
          <Prompt
            tests={props.tests}
            onSelect={props.onTakeTest}/>
          );
      case 'inProgress':
        return (
          <Test
            questions={props.tests[props.selectectedTest]}
            onCompleted={props.onCompleteTest}
          />
        );
      case 'complete':
        return <Results score={props.scores[props.selectectedTest]} />;
      default:
        return (
          <div>Nothing here</div>
        );
    }
  }
  render() {
    return (
      <div className="home">
        {this.renderChildByStatus(this.props)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = (dispatch) => ({
  onFetchTest() {
    dispatch({ type: 'FETCH_TESTS' });
    fetch('/api/getTests')
      .then(response => response.json())
      .then(response => response.availableTests.forEach(
          test => dispatch({ type: 'ADD_TEST', payload: { test } })
        )
      );
  },
  onTakeTest(name) {
    dispatch({ type: 'BEGIN_TEST', payload: { name } });
  },
  onCompleteTest(score) {
    dispatch({ type: 'COMPLETE_TEST', payload: { score }});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
