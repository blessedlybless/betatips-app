import { useState } from 'react';
import { verifyVIPCode } from '../services/api';
import { saveVIPCode } from '../utils/vipStorage';
import './CodeInput.css';

function CodeInput({ onSuccess }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await verifyVIPCode(code);
      
      if (result.valid) {
        saveVIPCode(code);
        onSuccess();
      } else {
        setError('Invalid or expired code');
      }
    } catch (err) {
      setError('Error verifying code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className="code-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your VIP code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        maxLength={16}
        required
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Unlock VIP Access'}
      </button>
    </form>
  );
}

export default CodeInput;
