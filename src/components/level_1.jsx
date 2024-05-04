import React, { useState } from 'react';
import '../assets/level1.css'; 

const Level_1 = () => {
  const [showBlock, setShowBlock] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [timer, setTimer] = useState(0); // Déclarer l'état pour le timer
  const [moves, setMoves] = useState(0); // Déclarer l'état pour le nombre de coups

  const startGameHandler = () => {
    setShowBlock(false);
    setShowOverlay(true);
    // Lancer le timer
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000); // Incrémenter le timer chaque seconde
    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque le jeu est terminé
    return () => clearInterval(interval);
  };

  const resetGame = () => {
    setTimer(0); // Réinitialiser le timer
    setMoves(0); // Réinitialiser le nombre de coups
  };

  const toggleOptions = () => {
    if (!showBlock) {
      setShowOptions(!showOptions);
    }
  };

  return (
    <div className="level-container__level1">
      <header className="header__lvl1">
        <div className={`options-button ${showBlock ? 'disabled' : ''}`} onClick={toggleOptions}>
          Option
        {showOptions && (
          <div className="options-menu">
            <button>Menu</button>
            <button>Config</button>
            <button>Son</button>
            </div>
        )}
        </div>
        <div className={`title__game_lvl1 ${showBlock ? 'non-clickable' : ''}`}>
          <p className='p__lvl1'>Level 1</p>
          <div className='container__divs'>
            <div className="containes__lvl1">Timing:{timer}s</div>
            <button className='containes__lvl2' onClick={resetGame}>Reset</button>
            <div className="containes__lvl1">Moves {moves}</div>
          </div>
        </div>
      </header>
      
      {showOverlay && <div className="content-overlay"></div>} 

      {showBlock && (
        <div className="launch-block__level1">
          <h1 className='rainbow-text__level1'>Level 1</h1>
          <div className="max-moves__level1">Nombre de coups maximum: 10</div>
          <div className="records__level1">Records: 0h|0m|0s / 0/10</div>
          <div className='launch__menu__lvl1'>
            <button className="start-button__level1" onClick={startGameHandler}>
              Start
            </button>
            <button className="start-button__level1" >
              Classement
            </button>
          </div>
            <button className="start-button__level2" >
             Home
            </button>
        </div>
      )} 
    </div>
    
  );
};

export default Level_1;

      

