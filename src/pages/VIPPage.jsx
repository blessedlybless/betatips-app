import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVIPTips } from '../services/api';
import { checkVIPAccess, getRemainingDays } from '../utils/vipStorage';
import Navbar from '../components/Navbar';
import VIPLockScreen from '../components/VIPLockScreen';
import GameCard from '../components/GameCard';
import './VIPPage.css';

function VIPPage() {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [vipTips, setVipTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remainingDays, setRemainingDays] = useState(0);
  
  useEffect(() => {
    const accessStatus = checkVIPAccess();
    setHasAccess(accessStatus);
    
    if (accessStatus) {
      setRemainingDays(getRemainingDays());
      fetchVIPTips();
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchVIPTips = async () => {
    setLoading(true);
    try {
      const data = await getVIPTips('all');
      setVipTips(data);
    } catch (error) {
      console.error('Error fetching VIP tips:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUnlock = () => {
    setHasAccess(true);
    setRemainingDays(getRemainingDays());
    fetchVIPTips();
  };
  
  return (
    <div className="app-container">
      <Navbar />
      
      <div className="vip-page">
        {!hasAccess ? (
          <VIPLockScreen onUnlock={handleUnlock} />
        ) : (
          <>
            <div className="vip-header">
              <button className="back-btn" onClick={() => navigate('/')}>
                ← Back
              </button>
              <div className="vip-status">
                <h2>VIP ACCESS ACTIVE</h2>
                <p className="days-remaining">{remainingDays} days remaining</p>
              </div>
            </div>
            
            {loading ? (
              <div className="loading">Loading VIP tips...</div>
            ) : (
              <div className="games-list">
                {vipTips.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default VIPPage;
