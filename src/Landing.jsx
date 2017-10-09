import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setSearchTerm, setSearchData, setPaginationData } from './actions/actionCreators';
import SearchComponent from './common/SearchComponent';
import Logo from './common/Logo';

class Landing extends React.Component {
  componentDidMount() {
    this.props.dispatch(setSearchTerm('')); //Limpa o search term na store do Redux, quando o usuário entra no aplicativo ou volta a landing page através de um link interno
  }

  handleChange = evento => {
    this.props.dispatch(setSearchTerm(evento.target.value));
  };

  handleClick = evento => {
    evento.preventDefault();
    const { searchTerm, pageData } = this.props;
    if (searchTerm) {
      getData(requests.search, { searchTerm: searchTerm, page: pageData }).then(response => {
        //Prepara a paginação da primeira busca e envia o usuário para a próxima tela
        pageData.page += 1;
        let total = Math.ceil(response.total_count / 20);
        this.props.dispatch(setSearchData(response.items));
        this.props.dispatch(setPaginationData({ total, page: 1, total_count: response.total_count }));
        this.props.history.push('/search');
      });
    }
  };
  render() {
    return (
      <div className="landing">
        <Logo />
        <form onSubmit={this.handleClick}>
          <SearchComponent
            handleChange={this.handleChange}
            value={this.props.searchTerm}
            handleClick={this.handleClick}
          />
        </form>
      </div>
    );
  }
}

Landing.propTypes = {
  searchTerm: PropTypes.string,
  pageData: PropTypes.object
};

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm, pageData: state.pageData };
}

export default connect(mapStateToProps)(Landing);
