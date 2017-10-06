import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { setSearchTerm, setSearchData } from './actionCreators';
import getData from './Requests';

class Landing extends Component {
  state = { loading: false };

  componentWillReceiveProps(nextProps) {}

  //Função responsável por enviar a request de procura ao servidor do Github e chamar a ação do Redux para salvar os dados na store
  handleGetData = e => {
    e.preventDefault();
    const { searchTerm } = this.props;

    this.setState({ loading: true }); // Estabelece o estado de loading na UI
    const data = getData('search', searchTerm); //Requisita os dados
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
    <Table.Row>
      <Table.Cell>{item.login}</Table.Cell>
      <Table.Cell>{item.html_url}</Table.Cell>
      <Table.Cell>
        <Link to={`/user/${item.login}`}>Abrir</Link>
      </Table.Cell>
    </Table.Row>
  );

  render() {
    const results = this.props.searchData
      ? this.props.searchData.map(item => {
          return this.handleTableRows(item);
        })
      : '';
    return (
      <div className="App">
        <input onChange={this.handleChange} />
        <button onClick={this.handleGetData}>Pesquisa</button>
        <Table textAlign="center" striped basic celled selectable>
          <Table.Header>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>URL</Table.HeaderCell>
            <Table.HeaderCell>Link</Table.HeaderCell>
          </Table.Header>
          <Table.Body>{results}</Table.Body>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm, searchData: state.searchData };
}

export default connect(mapStateToProps)(Landing);
