import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.post('/fix-request', async (req, res) => {
  const success = Math.random() >= 0.5;

  await new Promise((res) => setTimeout(res, 3000))
  if (success) {
    res.status(200).json({ status: 'done' });
  } else {
    res.status(200).json({ status: 'rejected' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
