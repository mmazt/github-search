import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setReposData } from './actions/actionCreators';
import Header from './Header';

class ReposList extends React.Component {
  state = { sort: true };
  componentDidMount() {
    const { user } = this.props.match.params;
    getData(requests.repos, user).then(response => {
      this.props.dispatch(setReposData(response));
    });
  }

  handleRepos = item => {
    const { user } = this.props.match.params;
    return (
      <tr key={item.name}>
        <td className="l-reposlist-name">
          <Link to={`/${user}/${item.name}`}>{item.name}</Link>
        </td>
        <td className="l-reposlist-url">{item.html_url}</td>
        <td className="l-reposlist-star">
          <i className="fa fa-star l-reposlist-star-icon" aria-hidden="true" />&nbsp;
          {item.stargazers_count}
        </td>
      </tr>
    );
  };

  handleChangeOrder = e => {
    e.preventDefault();
    let sort = !this.state.sort;
    this.setState({ sort });
  };

  render() {
    const { repositories } = this.props;
    let sortIcon = this.state.sort === true ? 'fa fa-sort-numeric-desc' : 'fa fa-sort-numeric-asc';
    sortIcon += ' l-reposlist-sort';
    const repos = repositories
      .sort((a, b) => {
        if (this.state.sort === true) {
          if (a.stargazers_count > b.stargazers_count) {
            return -1;
          }
          if (a.stargazers_count < b.stargazers_count) {
            return 1;
          }
          return 0;
        }
        if (this.state.sort === false) {
          if (a.stargazers_count < b.stargazers_count) {
            return -1;
          }
          if (a.stargazers_count > b.stargazers_count) {
            return 1;
          }
          return 0;
        }
        return undefined;
      })
      .map(item => this.handleRepos(item));

    return (
      <div>
        <Header />
        <h1 className="l-reposlist-header">
          Repositórios de {repositories && repositories[0] ? repositories[0].owner.login : ''}
        </h1>
        <table className="l-reposlist-table">
          <thead>
            <tr>
              <th>Nome do Repositório</th>
              <th className="l-reposlist-url-header">URL</th>
              <th className="l-reposlist-star-header">
                Estrelas &nbsp;<i onClick={this.handleChangeOrder} className={sortIcon} aria-hidden="true" />
              </th>
            </tr>
          </thead>
          <tbody>{repos}</tbody>
        </table>
        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { repositories: state.reposData };
}

export default connect(mapStateToProps)(ReposList);
