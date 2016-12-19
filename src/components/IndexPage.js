import React from 'react';
import { connect } from 'react-redux';
// import AthletePreview from './AthletePreview';
// import athletes from '../data/athletes';

class IndexPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log(nextProps.questions);
    }
  }
  render() {
    return (
      <div className="home">
        This is working...
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({ questions });

export default connect(mapStateToProps)(IndexPage);
