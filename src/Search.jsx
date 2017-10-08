import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './common/Loader';
import { setSearchTerm, setSearchData, setPaginationData } from './actions/actionCreators';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import Header from './Header';
import SearchComponent from './common/SearchComponent';

class Search extends Component {
  state = { loading: false };

  //Função responsável por enviar a request de procura ao servidor do Github e chamar a ação do Redux para salvar os dados na store
  handleGetData = e => {
    e.preventDefault();
    const { searchTerm, pageData } = this.props;
    this.setState({ loading: true }); // Estabelece o estado de loading na UI
    const data = getData(requests.search, { searchTerm, page: pageData.page }); //Requisita os dados com a primeira paginação
    data
      .then(response => {
        pageData.page += 1;

        let total = Math.floor(response.total_count / 20);
        this.props.dispatch(setSearchData(response.items));
        this.props.dispatch(setPaginationData({ total, page: pageData.page })); //Envia os dados para a store
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
    const { searchData, searchTerm } = this.props;
    const results = searchData.map(item => {
      return this.handleItemCard(item);
    });
    const pages = [...Array(this.props.pageData.total)]
      .map((item, i) => {
        return <div>{i}</div>;
      })
      .filter((item, i) => {
        return i < 3 || i > this.props.pageData.total - 3;
      });
    return (
      <div>
        <Header />
        <div className="l-search-container">
          <div className="l-search-input">
            <form onSubmit={this.handleGetData}>
              <SearchComponent value={searchTerm} handleChange={this.handleChange} handleClick={this.handleGetData} />
            </form>
            <div style={{ textAlign: 'right', margin: '15px 0 0 0' }}>{pages}</div>
          </div>
          <div className="l-search">
            {loading ? <Loader /> : searchData.length > 0 ? results : <p>Nenhum resultado encontrado</p>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm, searchData: state.searchData, pageData: state.pageData };
}

export default connect(mapStateToProps)(Search);
