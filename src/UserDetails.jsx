import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setUserData } from './actions/actionCreators';
import Loader from './common/Loader';
import Header from './Header';

class UserDetails extends React.Component {
  state = { loading: false };

  componentDidMount() {
    const { user } = this.props.match.params;

    this.setState({ loading: true }); // Estabelece o estado de Loading no componente

    getData(requests.user, user) //Faz a requisição dos dados do usuário no servidor e retorna uma promessa
      .then(response => {
        this.props.dispatch(setUserData(response));
      })
      .then(() => {
        this.setState({ loading: false }); //Retira o estado de loading do componente
      });
  }

  render() {
    const { userData } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <div className="l-user">
            <div className="l-user-avatar-container">
              <img className="l-user-avatar" src={userData.avatar_url} alt="Avatar do Usuário" />
            </div>
            <div className="l-user-data-container">
              <h2>
                {userData.login} - {userData.name}
              </h2>
              <h3>{userData.html_url}</h3>
              <p>
                <strong>Bio:</strong> {userData.bio ? userData.bio : 'Não Informado'}
              </p>
              <p>
                <strong>E-Mail: </strong>
                {userData.email ? userData.email : 'Não Informado'}
              </p>
              <p>
                <strong>Seguindo: </strong>
                {userData.following ? userData.following : 0}
              </p>
              <p>
                <strong>Seguidores: </strong>
                {userData.followers ? userData.followers : 0}
              </p>
              <Link to={`/${userData.login}/repos`}>
                <strong>Repositórios ( {userData.public_repos ? userData.public_repos : 0} ) </strong>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userData: state.userData };
}

export default connect(mapStateToProps)(UserDetails);
