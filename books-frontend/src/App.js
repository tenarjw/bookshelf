import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadBooks } from './store';

class App extends Component {
  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  { loadBooks },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
