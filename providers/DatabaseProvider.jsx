// Add these functions to your database context
const getPrompt = async () => {
  const response = await fetch('http://localhost:3000/daily-prompt');
  return response.json();
};

const getNextPrompt = async () => {
  const response = await fetch('http://localhost:3000/next-prompt', {
    method: 'POST'
  });
  return response.json();
};

// Add to your context value
const value = {
  // ... existing values
  getPrompt,
  getNextPrompt,
}; 