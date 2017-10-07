import React from 'react';
import '../css/searchComponent.css';

const SearchInput = props => (
  <div className="searchInput">
    <span className="wrapper">
      <input type="text" placeholder="Digite um nome de usuário" value={props.value} onChange={props.handleChange} />
    </span>
    <button type="submit" onClick={props.handleClick}>
      Pesquisar
    </button>
  </div>
);

export default SearchInput;
