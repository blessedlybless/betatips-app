import { useState } from 'react';
import CodeInput from './CodeInput';
import './VIPLockScreen.css';

function VIPLockScreen({ onUnlock }) {
  const [showCodeInput, setShowCodeInput] = useState(false);
  
  return (
    <div className="vip-lock-screen">
      <div className="lock-icon">🔒</div>
      <h2>VIP CONTENT</h2>
      <p className="vip-subtitle">Get 30 Days Premium Access</p>
      
      <div className="payment-info">
        <h3>How to Subscribe:</h3>
        <ol>
          <li>Make payment to any of the accounts below</li>
          <li>Contact us with payment proof</li>
          <li>Receive your 30-day VIP code</li>
          <li>Enter code below to unlock</li>
        </ol>
        
        <div className="payment-details">
          <div className="payment-method">
            <h4>Bank Transfer</h4>
            <p><strong>Bank:</strong> Your Bank Name</p>
            <p><strong>Account:</strong> 1234567890</p>
            <p><strong>Name:</strong> Your Name</p>
          </div>
          
          <div className="payment-method">
            <h4>Contact Us</h4>
            <p><strong>Telegram:</strong> @yourusername</p>
            <p><strong>WhatsApp:</strong> +234 123 456 7890</p>
          </div>
        </div>
      </div>
      
      {!showCodeInput ? (
        <button 
          className="btn-primary" 
          onClick={() => setShowCodeInput(true)}
        >
          I Have a VIP Code
        </button>
      ) : (
        <CodeInput onSuccess={onUnlock} />
      )}
    </div>
  );
}

export default VIPLockScreen;
