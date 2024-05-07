import React, { useEffect, useState } from 'react';
import '../assets/level1.css'; 
import SingleCard from "./SingleCard";

const Level_1 = () => {
  const [showBlock, setShowBlock] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(24);
  const [gameLost, setGameLost] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startGameHandler = () => {
    setShowBlock(false);
    setShowOverlay(true);
    const id = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    setIntervalId(id);
  };

  const resetGame = () => {
    clearInterval(intervalId);
    setTimer(0);
    setMoves(24);
    setGameLost(false);
    setGameWon(false);
    setIntervalId(null);
    shuffleCards();
    startGameHandler();
  };

  const toggleOptions = () => {
    if (!showBlock) {
      setShowOptions(!showOptions);
    }
  };
  
  const cardImages = [
    { src: "../public/img/jhbjhgvuytv5647kuhviy6ubyu6uhv7vv.JPG" },
    { src: "../public/img/c094af7e9752ddb9b2e59c7b9fbd9487.JPG" },
    { src: "../public/img/a7bc5a2e189ee42e1389e8fc3c0aa1ad.JPG" },
    { src: "../public/img/11e177d78d4184d5f17dd2b0c5321757.JPG" },
    { src: "../public/img/59a6d64c0479ed22e4e856c035808f4e.JPG" },
    { src: "../public/img/023e406d4c294be05d8c4d8206fadb90.JPG" },
  ];

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

  const handleChoice = (card) => {
    if (choiceOne && !choiceTwo) {
      setMoves(prevMoves => prevMoves - 1);
      setChoiceTwo(card);
    } else if (!choiceOne) {
      setChoiceOne(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const checkWin = () => {
    const pairsFound = cards.filter(card => card.matched).length / 2;
    if (pairsFound === 6) {
      clearInterval(intervalId);
      setGameWon(true);
    }
  };

  const checkLose = () => {
    if (moves === 0 && !cards.every(card => card.matched)) {
      clearInterval(intervalId);
      setGameLost(true);
    }
  };

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

  useEffect(() => {
    checkWin();
  }, [cards]);

  useEffect(() => {
    checkLose();
  }, [moves]);

  useEffect(() => {
    shuffleCards();
  }, []);

  // Fonction pour le composant "Perdu"
  const GameOverComponent = () => {
    return (
      <div className={`launch-block__level2 ${showBlock ? 'non-clickable' : ''}`}>
        <h1 className='rainbow-text__level2'>Perdu</h1>
        <div className="records__level1">
        <div className="max-moves__level1">Nombre de paires trouvées: {cards.filter(card => card.matched).length / 2}/6</div>
          <div>Temps écoulé: {timer} secondes</div>
          <div>Nombre de coups faits: {24 - moves}</div>
        </div>
        <div className="records__level2">
          <div>Records:</div>
          <div>0h|0m|0s / 0/10</div>
          <div>Nombre de paires trouvées</div>
        </div>
        <div className='launch__menu__lvl1'>
          <button className="start-button__level1" onClick={resetGame}>Rejouer</button>
          <button className="start-button__level1">Classement</button>
          <button className="start-button__level1">Home</button>
        </div>
      </div>
    );
  };

  // Fonction pour le composant "Gagné"
  const VictoryComponent = () => {
    return (
      <div className={`launch-block__level2 ${showBlock ? 'non-clickable' : ''}`}>
        <h1 className='rainbow-text__level2'>Gagné</h1>
        <div className="max-moves__level1">Nombre de paires trouvées: {cards.filter(card => card.matched).length / 2}/6</div>
        <div className="records__level1">Temps écoulé: {timer} secondes</div>
        <div className="records__level2">
          <div>Records:</div>
          <div>0h|0m|0s / 0/10</div>
          <div>Score</div>
        </div>
        <div className='launch__menu__lvl1'>
          <button className="start-button__level1" onClick={resetGame}>Rejouer</button>
          <button className="start-button__level1">Classement</button>
          <button className="start-button__level1">Home</button>
        </div>  
      </div>
    );
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
            <div className="containes__lvl1">Timer:{timer}s</div>
            <button className='containes__lvl2' onClick={() => {resetGame();}}>Reset</button>
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

      {showBlock && (
        <div className="launch-block__level1">
          <h1 className='rainbow-text__level1'>Level 1</h1>
          <div className="max-moves__level1">Nombre de coups maximum: 24</div>
          <div className="records__level1">Records: 0h|0m|0s / 0/10</div>
          <div className='launch__menu__lvl1'>
            <button className="start-button__level1" onClick={startGameHandler}>Start</button>
            <button className="start-button__level1">Classement</button>
            <button className="start-button__level1">Home</button>
          </div>
        </div>
      )}

      {gameLost && <GameOverComponent />}

      {gameWon && <VictoryComponent />}
    </div>
  );
};

export default Level_1;
