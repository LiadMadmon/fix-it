import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

// Route: POST /fix-request
app.post('/fix-request', (req, res) => {
  // Generate a random number (0 or 1) to decide the outcome
  const success = Math.random() >= 0.5;

  if (success) {
    res.status(200).json({ message: 'Request fixed successfully!' });
  } else {
    res.status(500).json({ error: 'Failed to fix the request!' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
