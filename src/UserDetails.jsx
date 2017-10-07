import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setUserData } from './actions/actionCreators';
import Loader from './helper/Loader';
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
          <div>
            <img src={userData.avatar_url} alt="Avatar do Usuário" />
            <h2>{userData.name}</h2>
            <Link to={`/${userData.login}/repos`}>Repositórios</Link>
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
