import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setReposData } from './actions/actionCreators';
import Header from './Header';

class ReposList extends React.Component {
  componentDidMount() {
    const { user } = this.props.match.params;
    getData(requests.repos, user).then(response => {
      this.props.dispatch(setReposData(response));
    });
  }

  handleRepos = item => {
    const { user } = this.props.match.params;
    return (
      <div key={item.name}>
        <Link to={`/${user}/${item.name}`}>{item.name}</Link>
      </div>
    );
  };

  render() {
    const { repositories } = this.props;
    const repos = repositories.map(item => this.handleRepos(item));

    return (
      <div>
        <Header />
        <h1>ReposList</h1>
        <div>{repos}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { repositories: state.reposData };
}

export default connect(mapStateToProps)(ReposList);
