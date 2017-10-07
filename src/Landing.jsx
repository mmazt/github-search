import React from 'react';
import { connect } from 'react-redux';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setSearchTerm, setSearchData } from './actions/actionCreators';
import SearchComponent from './common/SearchComponent';

class Landing extends React.Component {
  handleChange = evento => {
    this.props.dispatch(setSearchTerm(evento.target.value));
  };
  handleClick = evento => {
    getData(requests.search, { searchTerm: this.props.searchTerm, page: 1 }).then(response => {
      this.props.dispatch(setSearchData(response.items));
      this.props.history.push('/search');
    });
  };
  render() {
    return (
      <div>
        <h1> Landing</h1>
        <SearchComponent handleChange={this.handleChange} handleClick={this.handleClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm };
}

export default connect(mapStateToProps)(Landing);
