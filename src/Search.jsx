import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './helper/Loader';
import { setSearchTerm, setSearchData } from './actions/actionCreators';
import getData from './requests/Requests';
import Header from './Header';

class Search extends Component {
  state = { loading: false };

  componentDidMount() {
    if (this.props.searchTerm) {
    }
  }

  //Função responsável por enviar a request de procura ao servidor do Github e chamar a ação do Redux para salvar os dados na store
  handleGetData = e => {
    e.preventDefault();
    const { searchTerm } = this.props;

    this.setState({ loading: true }); // Estabelece o estado de loading na UI

    const data = getData('search', { searchTerm, page: 1 }); //Requisita os dados com a primeira paginação

    data
      .then(response => {
        this.props.dispatch(setSearchData(response.items)); //Envia os dados para a store
      })
      .then(() => {
        this.setState({ loading: false }); //Retira o estado de loading
      });
  };

  //Função que captura os dados digitados e chama a ação no Redux para atualizar o searchTerm na store
  handleChange = e => {
    const search = e.target.value;
    this.props.dispatch(setSearchTerm(search));
  };

  handleTableRows = item => (
    <tr key={item.login}>
      <td>{item.login}</td>
      <td>{item.html_url}</td>
      <td>
        <Link to={`/${item.login}`}>Abrir</Link>
      </td>
    </tr>
  );

  render() {
    const { loading } = this.state;
    const { searchData, searchTerm } = this.props;
    const results = searchData.map(item => {
      return this.handleTableRows(item);
    });

    return (
      <div className="App">
        <Header />
        <input value={searchTerm} onChange={this.handleChange} />
        <button onClick={this.handleGetData}>
          <i class="fa fa-search" aria-hidden="true" />Pesquisar
        </button>
        {loading ? (
          <Loader />
        ) : searchData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>URL</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>{results}</tbody>
          </table>
        ) : (
          <p>Nenhum resultado encontrado</p>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm, searchData: state.searchData };
}

export default connect(mapStateToProps)(Search);