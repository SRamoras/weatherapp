
import React from 'react';
import './Header.css';

const Header = ({ onLocationClick, onSettingsClick, onSearchIconClick }) => {
  return (
    <header className="fixed-header">
      <div className="header-icons">
        <button className="icon-button" onClick={onLocationClick} title="Localização">
          <span className="material-icons">location_on</span>
        </button>
        <button className="icon-button" onClick={onSettingsClick} title="Configurações">
          <span className="material-icons">settings</span>
        </button>
        <button className="icon-button" onClick={onSearchIconClick} title="Buscar">
          <span className="material-icons">search</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
