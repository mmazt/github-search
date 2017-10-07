import React from 'react';

const SearchInput = props => (
  <div className="searchInput">
    <span className="wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="Digite um nome de usuário"
        value={props.value}
        onChange={props.handleChange}
      />
    </span>
    <button className="search-button" type="submit" onClick={props.handleClick}>
      Pesquisar
    </button>
  </div>
);

export default SearchInput;
