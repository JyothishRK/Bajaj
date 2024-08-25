import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Route to handle POST requests to /bfhl
app.post('/bfhl', (req, res) => {
  console.log('Received POST request');
  console.log('Request body:', req.body);

  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid input' });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item >= 'a' && item <= 'z' && item > highestLowercaseAlphabet) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  const response = {
    is_success: true,
    user_id: 'your_fullname_ddmmyyyy', // Replace with actual user_id
    email: 'your_email@college.com', // Replace with actual email
    roll_number: 'your_roll_number', // Replace with actual roll_number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
  };

  res.status(200).json(response);
});

// Route to handle GET requests to /bfhl
app.get('/bfhl', (req, res) => {
  console.log('Received GET request');
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
