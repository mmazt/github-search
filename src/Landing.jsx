import React from 'react';
import { connect } from 'react-redux';
import getData from './requests/Requests';
import { setSearchTerm, setSearchData } from './actions/actionCreators';

class Landing extends React.Component {
  handleChange = evento => {
    this.props.dispatch(setSearchTerm(evento.target.value));
  };
  handleClick = evento => {
    getData('search', { searchTerm: this.props.searchTerm, page: 1 }).then(response => {
      this.props.dispatch(setSearchData(response.items));
      this.props.history.push('/search');
    });
  };
  render() {
    return (
      <div>
        <h1> Landing</h1>
        <input onChange={this.handleChange} />
        <button onClick={this.handleClick}>
          <i class="fa fa-search" aria-hidden="true" />Pesquisar
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm };
}

export default connect(mapStateToProps)(Landing);
