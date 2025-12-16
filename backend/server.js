const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample challenges data
const challenges = [
  { id: 1, title: 'Day 1 Challenge: Solve a puzzle' },
  { id: 2, title: 'Day 2 Challenge: Write a journal entry' },
  // Add more challenges here
];

// Routes
app.get('/api/challenges', (req, res) => {
  res.json(challenges);
});

app.post('/api/challenge/:id', (req, res) => {
  const challengeId = parseInt(req.params.id, 10);
  const challenge = challenges.find((ch) => ch.id === challengeId);

  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }

  const { answer } = req.body;

  // Simple validation (you can improve it)
  if (answer.trim() === '') {
    return res.status(400).json({ message: 'Answer cannot be empty' });
  }

  // Mark challenge as completed (you can store this in a DB later)
  res.json({ success: true, message: 'Challenge completed!' });
});

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`Server is running on http://localhost:${PORT}`);
    }
  
});
