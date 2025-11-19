import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames, addGame, updateGame, deleteGame, generateVIPCode } from '../services/api';
import './AdminPanel.css';

function AdminPanel() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [generatedCode, setGeneratedCode] = useState('');
  
  const [formData, setFormData] = useState({
    sport_type: 'football',
    match_details: '',
    tip_type: 'daily-best',
    prediction: '',
    odds: '',
    is_vip: false,
    match_date: '',
    status: 'pending'
  });
  
  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchGames();
  }, []);
  
  const fetchGames = async () => {
    try {
      const data = await getAllGames();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingGame) {
        await updateGame(editingGame.id, formData);
      } else {
        await addGame(formData);
      }
      
      // Reset form
      setFormData({
        sport_type: 'football',
        match_details: '',
        tip_type: 'daily-best',
        prediction: '',
        odds: '',
        is_vip: false,
        match_date: '',
        status: 'pending'
      });
      setShowForm(false);
      setEditingGame(null);
      fetchGames();
    } catch (error) {
      console.error('Error saving game:', error);
      alert('Failed to save game');
    }
  };
  
  const handleEdit = (game) => {
    setEditingGame(game);
    setFormData(game);
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await deleteGame(id);
        fetchGames();
      } catch (error) {
        console.error('Error deleting game:', error);
        alert('Failed to delete game');
      }
    }
  };
  
  const handleGenerateCode = async () => {
    try {
      const result = await generateVIPCode();
      setGeneratedCode(result.code);
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate VIP code');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };
  
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
      
      <div className="admin-actions">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add New Game'}
        </button>
        <button onClick={handleGenerateCode} className="btn-secondary">
          Generate VIP Code
        </button>
      </div>
      
      {generatedCode && (
        <div className="generated-code-box">
          <h3>New VIP Code Generated:</h3>
          <p className="code-display">{generatedCode}</p>
          <button onClick={() => {
            navigator.clipboard.writeText(generatedCode);
            alert('Code copied to clipboard!');
          }}>
            Copy Code
          </button>
        </div>
      )}
      
      {showForm && (
        <form className="game-form" onSubmit={handleSubmit}>
          <h3>{editingGame ? 'Edit Game' : 'Add New Game'}</h3>
          
          <label>
            Sport Type:
            <select name="sport_type" value={formData.sport_type} onChange={handleInputChange}>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
            </select>
          </label>
          
          <label>
            Match Details:
            <input
              type="text"
              name="match_details"
              value={formData.match_details}
              onChange={handleInputChange}
              placeholder="e.g., Arsenal vs Chelsea"
              required
            />
          </label>
          
          <label>
            Tip Type:
            <select name="tip_type" value={formData.tip_type} onChange={handleInputChange}>
              <option value="daily-best">Daily Best</option>
              <option value="over-under">Over/Under</option>
              <option value="double-combine">Double Combine</option>
              <option value="single-combine">Single Combine</option>
              <option value="daily-10-odds">Daily 10+ Odds</option>
            </select>
          </label>
          
          <label>
            Prediction:
            <input
              type="text"
              name="prediction"
              value={formData.prediction}
              onChange={handleInputChange}
              placeholder="e.g., Over 2.5 Goals"
              required
            />
          </label>
          
          <label>
            Odds:
            <input
              type="text"
              name="odds"
              value={formData.odds}
              onChange={handleInputChange}
              placeholder="e.g., 2.5"
              required
            />
          </label>
          
          <label>
            Match Date:
            <input
              type="datetime-local"
              name="match_date"
              value={formData.match_date}
              onChange={handleInputChange}
              required
            />
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="is_vip"
              checked={formData.is_vip}
              onChange={handleInputChange}
            />
            Is this a VIP tip?
          </label>
          
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="pending">Pending</option>
              <option value="win">Win</option>
              <option value="lose">Lose</option>
            </select>
          </label>
          
          <button type="submit" className="btn-submit">
            {editingGame ? 'Update Game' : 'Add Game'}
          </button>
        </form>
      )}
      
      <div className="games-table">
        <h3>All Games</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sport</th>
              <th>Match</th>
              <th>Tip Type</th>
              <th>Prediction</th>
              <th>Odds</th>
              <th>VIP</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.sport_type}</td>
                <td>{game.match_details}</td>
                <td>{game.tip_type}</td>
                <td>{game.prediction}</td>
                <td>{game.odds}</td>
                <td>{game.is_vip ? 'Yes' : 'No'}</td>
                <td className={`status-${game.status}`}>{game.status}</td>
                <td>{new Date(game.match_date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(game)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(game.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
