import React from 'react';
import { connect } from 'react-redux';
import getData from './Requests';
import { setUserData, setReposData } from './actionCreators';

class UserDetails extends React.Component {
  state = { loading: false };

  componentDidMount() {
    this.setState({ loading: true });
    const { user } = this.props.match.params;

    const data = new Promise((resolve, reject) => {
      let count = 0;
      getData('repos', user).then(response => {
        count += 1;
        this.props.dispatch(setReposData(response));
      });
      getData('user', user).then(response => {
        count += 1;
        this.props.dispatch(setUserData(response));
      });
      if (count >= 2) {
        resolve(true);
      }
    });
    data.then(() => {
      this.setState({ loading: false });
    });
  }

  handleRepos = item => {
    return <div>{item.name}</div>;
  };

  render() {
    const { userData, reposData } = this.props;
    const repositories = reposData.map(item => this.handleRepos(item));
    return (
      <div>
        <h1>User Details </h1>
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
