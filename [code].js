export default async function handler(req, res) {
  const { code } = req.query;

  if (!/^[A-Z]{2}[0-9]{3}$/.test(code)) {
    return res.status(404).send('Not found');
  }

  try {
    const backendRes = await fetch(
      `https://pranko-backend.onrender.com/${code}`
    );
    const script = await backendRes.text();
    res.setHeader('Content-Type', 'text/plain');
    res.status(backendRes.status).send(script);
  } catch (e) {
    res.status(500).send('Backend unreachable');
  }
}
