import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setRepoDetails } from './actions/actionCreators';

class RepoDetails extends React.Component {
  componentDidMount() {
    const { user, repo } = this.props.match.params;

    getData(requests.repoDetails, { user, repo }).then(response => {
      this.props.dispatch(setRepoDetails(response));
    });
  }

  render() {
    const { repo } = this.props;
    return (
      <div>
        <Header backPage={repo.owner ? '/' + repo.owner.login + '/repos' : ''} />
        <div className="l-repodetails-container">
          <h1>{repo.name}</h1>
          <div className="l-repodetails">
            <div className="l-repo-authorship">
              {repo.owner ? (
                <p className="l-repo-authorname">
                  <strong>Autor: &nbsp;</strong>
                  {repo.owner.login}
                </p>
              ) : (
                ''
              )}
              <p className="l-repo-language">
                <strong>Linguagem: &nbsp;</strong> <code className="l-repodetails-code">{repo.language}</code>
              </p>
              <p className="l-repo-stars">
                <strong>Estrelas: &nbsp;</strong>
                <i className="fa fa-star l-repodetails-star-icon" aria-hidden="true" /> &nbsp;
                <strong>{repo.stargazers_count}</strong>
              </p>{' '}
            </div>
            <div className="l-repodetails-description">
              <p>
                <strong>Descrição: </strong>
                {repo.description}
              </p>
              <p>
                <strong>URL: </strong>
                <a className="l-repodetails-link" href={repo.html_url} target="_blank" rel="nofollow norefferer">
                  {repo.html_url} &nbsp;<i className="fa fa-external-link" aria-hidden="true" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RepoDetails.propTypes = {
  repo: PropTypes.object
};

function mapStateToProps(state) {
  return { repo: state.repoDetails };
}

export default connect(mapStateToProps)(RepoDetails);
