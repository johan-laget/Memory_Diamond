import "../assets/SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !card.matched && !flipped) { // Ajouter !flipped ici
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          className="back"
          src="/img/cover.gif"
          alt="card-back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
