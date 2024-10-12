import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.post('/fix-request', (req, res) => {
  const success = Math.random() >= 0.5;

  if (success) {
    res.status(200).json({ status: 'done' });
  } else {
    res.status(200).json({ status: 'rejected' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
