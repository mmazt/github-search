import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import getData from './requests/Requests';
import { setRepoDetails } from './actions/actionCreators';

class RepoDetails extends React.Component {
  componentDidMount() {
    const { user, repo } = this.props.match.params;

    getData('repoDetails', { user, repo }).then(response => {
      this.props.dispatch(setRepoDetails(response));
    });
  }
  render() {
    return (
      <div>
        <Header />
        <h1>Repo Details</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { repo: state.repoDetail };
}

export default connect(mapStateToProps)(RepoDetails);
