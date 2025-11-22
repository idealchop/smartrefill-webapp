import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from river-bff!');
});

app.listen(port, () => {
  console.log(`BFF listening at http://localhost:${port}`);
});
