import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Loader, Input, Button, Icon } from 'semantic-ui-react';
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
    <Table.Row key={item.login}>
      <Table.Cell>{item.login}</Table.Cell>
      <Table.Cell>{item.html_url}</Table.Cell>
      <Table.Cell>
        <Link to={`/user/${item.login}`}>Abrir</Link>
      </Table.Cell>
    </Table.Row>
  );

  render() {
    const { loading } = this.state;
    const { searchData } = this.props;
    const results = searchData.map(item => {
      return this.handleTableRows(item);
    });

    return (
      <div className="App">
        <Input onChange={this.handleChange} />
        <Button onClick={this.handleGetData}>
          <Icon name="search" />Pesquisar
        </Button>
        {loading ? (
          <Loader active={loading}>Carregando</Loader>
        ) : searchData.length > 0 ? (
          <Table textAlign="center" striped basic celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>URL</Table.HeaderCell>
                <Table.HeaderCell>Link</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{results}</Table.Body>
          </Table>
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

export default connect(mapStateToProps)(Landing);
