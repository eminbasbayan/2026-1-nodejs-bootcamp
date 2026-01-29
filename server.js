const express = require('express');
const app = express();
const path = require('node:path');
const PORT = 3000;

const customers = [
  {
    id: 1,
    firstName: 'Emin',
    lastName: 'Başbayan',
  },
];

app.get('/', (request, response) => {
  response.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/products-page', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'products.html'));
});

app.get('/api/customers', (req, res) => {
  res.status(200).json(customers);
});

app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});
