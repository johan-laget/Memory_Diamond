import React, { useEffect, useState } from 'react';
import '../assets/level1.css'; 
import SingleCard from "./SingleCard";

const Level_1 = () => {
  const [showBlock, setShowBlock] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [timer, setTimer] = useState(0); // Déclarer l'état pour le timer
  const [moves, setMoves] = useState(48); // Déclarer l'état pour le nombre de coups
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

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
    setMoves(24); // Réinitialiser le nombre de coups
  };

  const toggleOptions = () => {
    if (!showBlock) {
      setShowOptions(!showOptions);
    }
  };
  
  const cardImages = [
    { src: "/img/helmet-1.png" },
    { src: "/img/potion-1.png" },
    { src: "/img/ring-1.png" },
    { src: "/img/scroll-1.png" },
    { src: "/img/shield-1.png" },
    { src: "/img/sword-1.png" },
  ];

  //shuffle cards
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
  };

  // Fonction pour gérer le choix de la carte
  const handleChoice = (card) => {
    if (choiceOne && !choiceTwo) { // Vérifier s'il y a déjà une première carte retournée
      setMoves(prevMoves => prevMoves - 1); // Décrémenter le nombre de coups
      setChoiceTwo(card);
    } else if (!choiceOne) { // S'il n'y a pas encore de première carte retournée
      setChoiceOne(card);
    }
  };

  //reset choices
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  //compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Vérifier si le joueur a gagné ou perdu
  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setGameWon(true); // Définir l'état du jeu comme gagné
    } else if (moves === 0) {
      setGameLost(true); // Définir l'état du jeu comme perdu
    }
  }, [moves, cards]);

  useEffect(() => {
    shuffleCards();
  }, []);

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
            <div className="containes__lvl1">Timer:{timer}s</div>
            <button className='containes__lvl2' onClick={() => {resetGame(); shuffleCards();}}>Reset</button>
            <div className="containes__lvl1">Moves {moves}</div>
          </div>
        </div>
      </header>
      <div className={`container_level1 ${showBlock ? 'non-clickable' : ''}`}>
        <div className="background_level1">
          <div className="statue_1"></div>
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
              />
            ))}
          </div>
          <div className="statue_2"></div>
        </div>
      </div>
      {showOverlay && <div className="content-overlay"></div>} 

      {showBlock && (
        <div className="launch-block__level1">
          <h1 className='rainbow-text__level1'>Level 1</h1>
          <div className="max-moves__level1">Nombre de coups maximum: 24</div>
          <div className="records__level1">Records: 0h|0m|0s / 0/10</div>
          <div className='launch__menu__lvl1'>
            <button className="start-button__level1" onClick={startGameHandler}>
              Start
            </button>
            <button className="start-button__level1" >
              Classement
            </button>
            <button className="start-button__level1" >
              Home
            </button>
          </div>
        </div>
      )} 
          
      {/* {gameWon && (
        <div className="launch-block__level2">
          <h1 className='rainbow-text__level2'>Gagné</h1>
          <div className="max-moves__level1">Nombre de coups faits: {24 - moves}/24</div>
          <div className="records__level1">Temps écoulé: {timer} secondes</div>
          <div className="records__level2">
            <div>Records:</div>
            <div>0h|0m|0s / 0/10</div>
            <div>Nombre de coups faits: {24 - moves}</div>
            <div>Score</div>
          </div>
          <div className='launch__menu__lvl1'>
            <button className="start-button__level1" onClick={() => {resetGame(); shuffleCards();}}>
              Rejouer
            </button>
            <button className="start-button__level1" >
              Classement
            </button>
            <button className="start-button__level1" >
              Home
            </button>
          </div>
        </div>
      )} */}
      
      {gameLost && (
        <div className="launch-block__level2">
          <h1 className='rainbow-text__level2'>Perdu</h1>
          <div className="max-moves__level1">Nombre de coups faits: {24 - moves}/24</div>
          <div className="records__level1">Temps écoulé: {timer} secondes</div>
          <div className="records__level2">
            <div>Records:</div>
            <div>0h|0m|0s / 0/10</div>
            <div>Nombre de coups faits: {24 - moves}</div>
          </div>
          <div className='launch__menu__lvl1'>
            <button className="start-button__level1" onClick={() => {resetGame(); shuffleCards();}}>
              Rejouer
            </button>
            <button className="start-button__level1" >
              Classement
            </button>
            <button className="start-button__level1" >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level_1;

