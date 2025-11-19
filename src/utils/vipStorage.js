// Check if user has valid VIP access
export const checkVIPAccess = () => {
  const vipCode = localStorage.getItem('vipCode');
  const vipExpiry = localStorage.getItem('vipExpiry');
  
  if (!vipCode || !vipExpiry) {
    return false;
  }
  
  const expiryDate = new Date(vipExpiry);
  const currentDate = new Date();
  
  if (currentDate > expiryDate) {
    // Code expired, remove it
    localStorage.removeItem('vipCode');
    localStorage.removeItem('vipExpiry');
    return false;
  }
  
  return true;
};

// Save VIP code with 30-day expiry
export const saveVIPCode = (code) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30); // Add 30 days
  
  localStorage.setItem('vipCode', code);
  localStorage.setItem('vipExpiry', expiryDate.toISOString());
};

// Get remaining days
export const getRemainingDays = () => {
  const vipExpiry = localStorage.getItem('vipExpiry');
  
  if (!vipExpiry) return 0;
  
  const expiryDate = new Date(vipExpiry);
  const currentDate = new Date();
  const diffTime = expiryDate - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

// Remove VIP access
export const removeVIPAccess = () => {
  localStorage.removeItem('vipCode');
  localStorage.removeItem('vipExpiry');
};
