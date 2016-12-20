import React from 'react';

class Test extends React.Component {
  render() {
    if (this.props.questions) {
      const numberQuestions = this.props.questions.length;

      return (
        <div>
          {this.props.currentQuestion > 0 ? (
            <div className="last-question" onClick={() => this.props.onPreviousQuestion()} />
          ) : <div className="placeHolder" />}
          <div className="question">{this.props.questions[this.props.currentQuestion]}</div>
          {this.props.currentQuestion < (this.props.questions.length - 1) ? (
            <div className="next-question" onClick={() => this.props.onNextQuestion()} />
          ) : <div className="placeHolder" />}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Test;
