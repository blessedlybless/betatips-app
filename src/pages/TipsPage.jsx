import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';
import './TipsPage.css';

// Fetch tips by date filter
async function fetchTipsByDate(dateFilter) {
  const url = `https://api.betatips.com.ng/tips/public/${dateFilter}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tips");
  return await res.json();
}

function TipsPage() {
  const navigate = useNavigate();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('today'); // Default to today

  useEffect(() => {
    fetchTips();
  }, [dateFilter]);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const data = await fetchTipsByDate(dateFilter);
      setTips(data);
    } catch (error) {
      console.error('Error fetching tips:', error);
      setTips([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilterTitle = () => {
    switch(dateFilter) {
      case 'today': return "Today's Games";
      case 'tomorrow': return "Tomorrow's Games";
      case 'yesterday': return "Yesterday's Games";
      case 'last-two-days': return "Last Two Days";
      default: return "Games";
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="tips-page">
        <div className="tips-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back
          </button>
          <h2>{getFilterTitle()}</h2>
        </div>

        {/* Date Filter Bar */}
        <div className="filter-bar">
          <button
            className={dateFilter === 'today' ? 'active' : ''}
            onClick={() => setDateFilter('today')}
          >
            Today
          </button>
          <button
            className={dateFilter === 'tomorrow' ? 'active' : ''}
            onClick={() => setDateFilter('tomorrow')}
          >
            Tomorrow
          </button>
          <button
            className={dateFilter === 'yesterday' ? 'active' : ''}
            onClick={() => setDateFilter('yesterday')}
          >
            Yesterday
          </button>
          <button
            className={dateFilter === 'last-two-days' ? 'active' : ''}
            onClick={() => setDateFilter('last-two-days')}
          >
            Last Two Days
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading tips...</div>
        ) : tips.length === 0 ? (
          <div className="no-tips">
            <p>No tips available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="games-list">
            {tips.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TipsPage;
