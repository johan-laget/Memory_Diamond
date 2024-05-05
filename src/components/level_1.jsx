import React, { useEffect, useState } from 'react';
import '../assets/level1.css'; 
import SingleCard from "./SingleCard";

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
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
  
    const shuffleCards = () => {
      const shuffleCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffleCards);
      setTurns(0);
    };
  
    // handle a choise
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };
  
    //reset choices & increase turn
    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns((prevTurns) => prevTurns + 1);
      setDisabled(false);
    };
  
    //compare choices
    useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
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
  
    //start a new game automatically
    useEffect(() => {
      shuffleCards();
    }, []);
  
    console.log(cards);
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
            <button className='containes__lvl2' onClick={() => {resetGame(); shuffleCards();}}>Reset</button>
            <div className="containes__lvl1">Moves {moves}</div>
          </div>
        </div>
      </header>
      <div className="App">
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

      

