const express = require('express');
const app = express();
const path = require('node:path');
const PORT = 3000;

// Middleware to parse JSON badies
app.use(express.json());

const users = [
  { id: 1, name: 'Ahmet', age: 25, email: 'ahmet@example.com' },
  { id: 2, name: 'Ayşe', age: 30, email: 'ayse@example.com' },
];

app.get('/', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  console.log(req.body);
  const newUsers = [...users, req.body]

  res.json(newUsers);
});

app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});
