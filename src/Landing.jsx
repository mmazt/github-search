import React from 'react';
import { connect } from 'react-redux';
import getData from './requests/Requests';
import * as requests from './requests/requestList';
import { setSearchTerm, setSearchData } from './actions/actionCreators';
import SearchComponent from './common/SearchComponent';
import Logo from './common/Logo';

class Landing extends React.Component {
  componentDidMount() {
    this.props.dispatch(setSearchTerm(''));
  }

  handleChange = evento => {
    this.props.dispatch(setSearchTerm(evento.target.value));
  };
  handleClick = evento => {
    evento.preventDefault();
    if (this.props.searchTerm) {
      getData(requests.search, { searchTerm: this.props.searchTerm, page: 1 }).then(response => {
        this.props.dispatch(setSearchData(response.items));
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

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm };
}

export default connect(mapStateToProps)(Landing);
