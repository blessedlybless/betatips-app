import { useNavigate } from 'react-router-dom';
import './TipCard.css';
import {
  FaFutbol, FaStar, FaBasketballBall, FaTableTennis, FaDice, FaChartBar, FaAward, FaTrophy,
} from 'react-icons/fa';

function getIcon(category, isVIP) {
  if (isVIP) return <FaTrophy />;
  switch (category) {
    case 'football': return <FaFutbol />;
    case 'basketball': return <FaBasketballBall />;
    case 'tennis': return <FaTableTennis />;
    case 'daily-best': return <FaStar />;
    case 'daily-10-odds': return <FaDice />;
    case 'double-combine': return <FaChartBar />;
    case 'single-combine': return <FaChartBar />;
    case 'over-under': return <FaDice />;
    case 'ht-ft-archive': return <FaAward />;
    case 'correct-score': return <FaStar />;
    default: return <FaStar />;
  }
}

function TipCard({ title, category, isVIP }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (isVIP) {
      navigate('/vip');
    } else {
      navigate(`/tips/${category}`);
    }
  };

  return (
    <div className="tip-card" onClick={handleClick}>
      <span className="tip-icon">{getIcon(category, isVIP)}</span>
      <h3>{title}</h3>
      {isVIP && <span className="vip-badge">VIP</span>}
    </div>
  );
}

export default TipCard;
