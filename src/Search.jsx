import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './common/Loader';
import { setSearchTerm, setSearchData, setPaginationData } from './actions/actionCreators';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import Header from './Header';
import SearchComponent from './common/SearchComponent';
import Pagination from './common/Pagination';

class Search extends Component {
  state = { loading: false };

  //Função que captura os dados digitados e chama a ação no Redux para atualizar o searchTerm na store
  handleChange = evento => {
    const search = evento.target.value;
    this.props.dispatch(setSearchTerm(search));
  };

  //Função responsável por enviar a request de procura ao servidor do Github e chamar a ação do Redux para salvar os dados na store
  handleGetData = e => {
    e.preventDefault();
    const { searchTerm, pageData } = this.props;
    this.setState({ loading: true }); // Estabelece o estado de loading na UI
    const data = getData(requests.search, { searchTerm, page: pageData.page }); //Requisita os dados com a primeira paginação
    data
      .then(response => {
        pageData.page += 1;
        let total = Math.ceil(response.total_count / 20);
        this.props.dispatch(setSearchData(response.items));
        this.props.dispatch(setPaginationData({ total, page: 1, total_count: response.total_count })); //Envia os dados para a store
      })
      .then(() => {
        this.setState({ loading: false }); //Retira o estado de loading
      });
  };

  handleChangePage = (evento, page) => {
    //Função que envia uma nova chamada de paginação para o servidor
    evento.preventDefault();
    this.setState({ loading: true });
    const { searchTerm } = this.props;
    const data = getData(requests.search, { searchTerm, page: page }); //Requisita os dados com a nova paginação
    data
      .then(response => {
        let total = Math.ceil(response.total_count / 20);
        this.props.dispatch(setSearchData(response.items));
        this.props.dispatch(setPaginationData({ total, page: page, total_count: response.total_count })); //Envia os dados para a store
      })
      .then(() => {
        this.setState({ loading: false }); //Retira o estado de loading
      });
  };

  handleItemCard = item => (
    <div key={item.login} className="l-search-box">
      <div>
        <Link to={`/${item.login}`}>
          <img className="l-search-avatar" src={item.avatar_url} alt="User Avatar" />
        </Link>
        <span className="l-search-link-text">
          <Link to={`/${item.login}`}>{item.login}</Link>
          <br />
          {item.html_url}
        </span>
      </div>
    </div>
  );

  render() {
    const { loading } = this.state;
    const { searchData, searchTerm, pageData } = this.props;
    const results = searchData.map(item => {
      return this.handleItemCard(item);
    });
    const pages = Pagination({ pageData: this.props.pageData, handleChangePage: this.handleChangePage });
    const results_num = {
      min: pageData.page * 20 - 20 + 1,
      max: pageData.page * 20 <= pageData.total_count ? pageData.page * 20 : pageData.total_count
    };
    return (
      <div>
        <Header />
        <div className="l-search-container">
          <div className="l-search-input">
            <form onSubmit={this.handleGetData}>
              <SearchComponent value={searchTerm} handleChange={this.handleChange} handleClick={this.handleGetData} />
            </form>
          </div>
          {!loading && results && pages.length > 3 ? (
            <div style={{ fontFamily: 'Open Sans', fontSize: '0.9em', marginTop: '10px' }}>
              Exibindo resultados do {results_num.min} ao {results_num.max} de {pageData.total_count}
            </div>
          ) : (
            ''
          )}
          {!loading && results && pages.length > 3 ? (
            <div style={{ textAlign: 'right', margin: '15px 0 0 0', paddingBottom: '0' }}>{pages}</div>
          ) : (
            ''
          )}
          <div className="l-search">
            {loading ? <Loader /> : searchData.length > 0 ? results : <p>Nenhum resultado encontrado</p>}
          </div>
          {!loading && results && pages.length > 3 ? (
            <div style={{ textAlign: 'right', margin: '15px 0 0 0' }}>{pages}</div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm, searchData: state.searchData, pageData: state.pageData };
}

export default connect(mapStateToProps)(Search);
