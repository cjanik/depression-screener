import React from 'react';

class Prompt extends React.Component {
  render() {
    const tests = [];
    let key = 1;
    for (let test in this.props.tests) {
      tests.push(
        <div className="test" key={key++}>
        <span>{test} </span>
        <button onClick={() => this.props.onSelect(test)}>Take test</button>
        </div>
      );
    }
    return (
      <div>{[...tests]}</div>
    );
  }
}

export default Prompt;
