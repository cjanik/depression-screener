import React from 'react';

class Test extends React.Component {
  render() {
    if (this.props.questions) {
      return (
        this.props.questions.map(question => {
          <div className="question">{question}</div>
        })
      );
    } else {
      return null;
    }
  }
}

export default Test;
