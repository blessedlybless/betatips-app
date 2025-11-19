import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TipCard from '../components/TipCard';
import './HomePage.css';
import { FaCrown } from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();

  const categories = [
    { title: 'DAILY BEST', category: 'daily-best', isVIP: false },
    { title: 'FOOTBALL', category: 'football', isVIP: false },
    { title: 'DAILY 10+ ODDS', category: 'daily-10-odds', isVIP: false },
    { title: 'OVER UNDER', category: 'over-under', isVIP: false },
    { title: 'DOUBLE COMBINE', category: 'double-combine', isVIP: false },
    { title: 'SINGLE COMBINE', category: 'single-combine', isVIP: false },
    { title: 'BASKETBALL', category: 'basketball', isVIP: false },
    { title: 'TENNIS', category: 'tennis', isVIP: false },
  ];

  const vipCategories = [
    { title: 'HT. FT. VIP ARCHIVE', category: 'ht-ft-archive', isVIP: true },
    { title: 'CORRECT SCORE VIP ARCHIVE', category: 'correct-score', isVIP: true },
  ];

  return (
    <div className="app-container">
      <Navbar />
      <header className="app-header">
        <h1 className="app-logo">Betatips</h1>
        <h2 className="app-subtitle">FREE TIPS</h2>
      </header>
      <main className="tips-grid">
        {categories.map((cat, index) => (
          <TipCard
            key={index}
            title={cat.title}
            category={cat.category}
            isVIP={cat.isVIP}
          />
        ))}
        {vipCategories.map((cat, index) => (
          <TipCard
            key={`vip-${index}`}
            title={cat.title}
            category={cat.category}
            isVIP={cat.isVIP}
          />
        ))}
      </main>
      <footer className="app-footer">
        <button
          className="vip-join-btn"
          onClick={() => navigate('/vip')}
        >
          <span className="vip-btn-icon"><FaCrown /></span>
          JOIN VIP CLUB!
        </button>
      </footer>
    </div>
  );
}

export default HomePage;
