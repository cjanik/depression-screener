import React from 'react';

class Result extends React.Component {
  render() {
    return (
      <div className="result">{this.props.score}</div>
    );
  }
}

export default Result;
