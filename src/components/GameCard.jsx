import './GameCard.css';

function GameCard({ game }) {
  const getStatusColor = (status) => {
    if (status === 'win') return 'green';
    if (status === 'lose') return 'red';
    return 'orange';
  };
  
  return (
    <div className="game-card">
      <div className="game-header">
        <span className="game-sport">{game.sport_type}</span>
        <span className={`game-status ${getStatusColor(game.status)}`}>
          {game.status.toUpperCase()}
        </span>
      </div>
      
      <div className="game-match">
        <h4>{game.match_details}</h4>
      </div>
      
      <div className="game-details">
        <div className="game-detail-item">
          <span className="label">Tip Type:</span>
          <span className="value">{game.tip_type}</span>
        </div>
        <div className="game-detail-item">
          <span className="label">Prediction:</span>
          <span className="value">{game.prediction}</span>
        </div>
        <div className="game-detail-item">
          <span className="label">Odds:</span>
          <span className="value odds">{game.odds}</span>
        </div>
        <div className="game-detail-item">
          <span className="label">Date:</span>
          <span className="value">{new Date(game.match_date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
