import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './common/Loader';
import { setSearchTerm, setSearchData } from './actions/actionCreators';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import Header from './Header';
import SearchComponent from './common/SearchComponent';

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

    const data = getData(requests.search, { searchTerm, page: 1 }); //Requisita os dados com a primeira paginação

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

  handleItemCard = item => (
    <div key={item.login} className="gitCard">
      <div>
        <Link to={`/${item.login}`}>{item.login}</Link>
      </div>
      <div>{item.name}</div>
      <div>{item.html_url}</div>
    </div>
  );

  render() {
    const { loading } = this.state;
    const { searchData, searchTerm } = this.props;
    const results = searchData.map(item => {
      return this.handleItemCard(item);
    });

    return (
      <div className="Search">
        <Header />
        <SearchComponent value={searchTerm} handleChange={this.handleChange} handleClick={this.handleGetData} />
        {loading ? <Loader /> : searchData.length > 0 ? results : <p>Nenhum resultado encontrado</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm, searchData: state.searchData };
}

export default connect(mapStateToProps)(Search);
