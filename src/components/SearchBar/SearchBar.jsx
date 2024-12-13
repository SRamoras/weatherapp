import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';
import { getCitySuggestions } from '../../services/api';

const SearchBar = ({ onSearch, onClose, isClosing }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Dispara a animação de abertura após o mount
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isClosing) {
      setIsVisible(false);
    }
  }, [isClosing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city.trim());
      setCity('');
      setSuggestions([]);
      setShowSuggestions(false);
      onClose();
    }
  };

  const handleIconClick = () => {
    onClose();
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 1) {
      setLoadingSuggestions(true);
      try {
        const response = await getCitySuggestions(value);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const places = response.data.map(item => `${item.name}, ${item.country}`);
          setSuggestions(places);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoadingSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (place) => {
    setCity(place);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(place);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const containerClass = `search-bar-container ${
    isClosing ? 'close' : isVisible ? 'open' : ''
  }`;

  return (
    <div className={containerClass}>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Search for the desired location..."
        />
        <button type="button" className="search-icon" onClick={handleIconClick}>
          <span className="material-icons">close</span>
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {loadingSuggestions ? (
            <li>Loading...</li>
          ) : (
            suggestions.map((place, index) => (
              <li key={index} onClick={() => handleSuggestionClick(place)}>
                {place}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
