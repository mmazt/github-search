import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';

const Header = () => {
  return (
    <header className="l-header" role="navigation">
      <div className="l-header-box l-header-box-1" role="presentation">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="l-header-box l-header-box-2">
        <p>
          <span className="header-search-symbol">
            <i className="fa fa-search" aria-hidden="true" />
          </span>{' '}
          <span className="header-search-text">&nbsp;Pesquisar</span>
          <span className="header-back-symbol">
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </span>{' '}
          <span className="header-back-text">&nbsp;Voltar</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
