import React from 'react';
import { connect } from 'react-redux';
import getData from './Requests';
import { Dimmer, Loader } from 'semantic-ui-react';
import { setUserData, setReposData } from './actionCreators';

class UserDetails extends React.Component {
  state = { loading: false };

  componentDidMount() {
    this.setState({ loading: true }); // Estabelece o estado de Loading no componente

    const { user } = this.props.match.params;

    //Cria um gerador que garante que o estado de loading seja mantido enquanto as duas requisições para o servidor não tenham retornado.
    function* generator() {
      yield getData('repos', user);
      yield getData('user', user);
      (yield) 
    }
    var data = generator();

    data.next().value.then(response => {
      this.props.dispatch(setReposData(response));
    });

    //Na última chamada para o gerador, passa o método responsável por retirar o estado de loading
    data.next().value.then(response => {
      this.props.dispatch(setUserData(response));
      data.next(this.setState({loading:false}))
    }); 

  }

  handleRepos = item => {
    return <div key={item.name}>{item.name}</div>;
  };

  render() {
    const { userData, reposData } = this.props;
    const { loading } = this.state;
    const repositories = reposData.map(item => this.handleRepos(item));
    return (
      <div>
        <Dimmer active={loading}>
          <Loader>Carregando Dados</Loader>
        </Dimmer>
        <img src={userData.avatar_url} alt="Avatar do Usuário" />
        <h2>{userData.name}</h2>
        {repositories}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userData: state.userData, reposData: state.reposData };
}

export default connect(mapStateToProps)(UserDetails);
