import React from 'react';
import './phone.css';

const Phone = () => {
  
  const scrollToTop = () => {
    const mainContainer = document.querySelector('.main-container-home-page');
    if (mainContainer) {
      mainContainer.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    }
  };

  return (
    <div className="phone-container">      
    
      <div className='top-phone'>
        <div>
        <div className='earphone'></div>
        <div className='cam'></div>
        </div>
      </div>

      <div className="back-phone">


       
        <button onClick={scrollToTop} aria-label="Voltar ao topo da página">
        </button>
      </div>
    </div>
  );
};

export default Phone;
