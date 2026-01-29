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

const role = 'user';

const isAdmin = (req, res, next) => {
  if (req.role === 'admin') {
    next();
  } else {
    res.status(401).send('Kullanıcı yetkisi yok!');
  }
};

function isLogin(req, res, next) {
  if (role === 'user') {
    next();
  } else {
    res.status(401).send('Lütfen giriş yapınız!');
  }
}

app.get('/', (request, response) => {
  response.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/products-page', isAdmin, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'products.html'));
});

app.get('/new-page', isLogin, (req, res) => {
  // db işlemleri
  res.status(200).sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page', (req, res) => {
  res.redirect(301, '/new-page');
});

app.get('/api/customers', isAdmin, (req, res) => {
  res.status(200).json(customers);
});

app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});
