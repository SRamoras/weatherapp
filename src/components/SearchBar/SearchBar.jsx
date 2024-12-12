// src/components/SearchBar/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';
import { getCitySuggestions } from '../../services/api';
import ReactDOM from 'react-dom';

const SearchBar = ({ onSearch, onExpandChange, onClose }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const inputRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário submetido com cidade:', city);
    if (city.trim() !== '') {
      onSearch(city.trim());
      setCity('');
      setSuggestions([]);
      setShowSuggestions(false);
      onExpandChange(false);
    }
  };

  const handleIconClick = () => {
    console.log('Ícone de fechar clicado');
    handleClose();
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);
    console.log('Valor do input alterado para:', value);

    if (value.length > 1) {
      setLoadingSuggestions(true);
      console.log('Buscando sugestões para:', value);
      try {
        const response = await getCitySuggestions(value);
        console.log('Resposta da API de sugestões:', response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const places = response.data.map(item => `${item.name}, ${item.country}`);
          console.log('Sugestões extraídas:', places);
          setSuggestions(places);
          setShowSuggestions(true);
        } else {
          console.log('Nenhuma sugestão encontrada');
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoadingSuggestions(false);
        console.log('Finalizou a busca de sugestões');
      }
    } else {
      console.log('Valor do input com menos de 2 caracteres, escondendo sugestões');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (place) => {
    console.log('Sugestão clicada:', place);
    setCity(place);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(place);
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-bar-container')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Deve coincidir com a duração da animação
  };

  // Renderiza o SearchBar usando React Portal para garantir que fique sobre todos os elementos
  return ReactDOM.createPortal(
    <div className="favorites-page-overlay">
      <div className={`search-bar-container ${isClosing ? 'slideDown' : ''}`}>
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Digite o nome da cidade"
          />
          <button type="button" className="search-icon" onClick={handleIconClick}>
            <span className="material-icons">close</span>
          </button>
        </form>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {loadingSuggestions ? (
                
              <li>Carregando...</li>
            ) : (
              suggestions.map((place, index) => (
                <li key={index}onClick={() => {
                    handleSuggestionClick(place);
                    handleClose();
                  }}>
                  {place}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>,
    document.body // Renderiza o SearchBar no final do body para evitar problemas de empilhamento
  );
};

export default SearchBar;
