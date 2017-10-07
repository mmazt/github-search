import React from 'react';
import '../css/loader.css';

const Loader = () => (
  <div style={{ textAlign: 'center', width: '100px', height: '100px', position: 'fixed', top: '50%', left: '50%' }}>
    <div className="loader" />
    <span>Carregando</span>
  </div>
);

export default Loader;
