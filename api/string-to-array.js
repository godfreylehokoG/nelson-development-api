// api/string-to-array.js
export default function handler(req, res) {
  // Set CORS headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed. Please use POST.' 
    });
  }

  try {
    // Get the data from request body
    const { data } = req.body;

    // Validate input
    if (!data) {
      return res.status(400).json({ 
        error: 'Missing "data" field in request body.' 
      });
    }

    if (typeof data !== 'string') {
      return res.status(400).json({ 
        error: 'The "data" field must be a string.' 
      });
    }

    // Convert string to array of characters
    const charactersArray = data.split('');

    // Sort the array alphabetically
    const sortedArray = charactersArray.sort();

    // Return the result in the required format
    res.status(200).json({
      word: sortedArray
    });

  } catch (error) {
    console.error('API Error:', error);
    
    res.status(500).json({ 
      error: 'Internal server error. Please try again.' 
    });
  }
}