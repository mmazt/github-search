import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setReposData } from './actions/actionCreators';
import Header from './Header';
import SortTable from './common/SortTable';

class ReposList extends React.Component {
  state = { sort: true };
  componentDidMount() {
    const { user } = this.props.match.params;
    getData(requests.repos, user).then(response => {
      this.props.dispatch(setReposData(response));
    });
  }

  handleRepos = item => {
    //Criação das table rows de cada repositório
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
    //Função responsável por mudar a direção do sort da tabela
    e.preventDefault();
    let sort = !this.state.sort;
    this.setState({ sort });
  };

  render() {
    const { repositories } = this.props;
    let sortIcon = this.state.sort === true ? 'fa fa-sort-numeric-desc' : 'fa fa-sort-numeric-asc';
    sortIcon += ' l-reposlist-sort';
    const repos = SortTable(repositories, this.state.sort).map(item => this.handleRepos(item));

    return (
      <div>
        <Header backPage={repositories && repositories[0] ? '/' + repositories[0].owner.login : ''} />
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

ReposList.proptypes = {
  repositories: PropTypes.Array
};

function mapStateToProps(state) {
  return { repositories: state.reposData };
}

export default connect(mapStateToProps)(ReposList);
