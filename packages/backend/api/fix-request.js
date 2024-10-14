export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = Math.random() >= 0.5;

    if (success) {
      return res.status(200).json({ status: 'done' });
    } else {
      return res.status(200).json({ status: 'rejected' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}