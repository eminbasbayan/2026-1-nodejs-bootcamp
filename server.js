const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('node:fs');
const path = require('node:path');
const { logger } = require('./middleware/logEvents.js');
const errorHandler = require('./middleware/errorHandler.js');
const PORT = 3000;

const corsOptions = {
  origin: function (origin, callback) {
    // İzin verilen origins listesi
    const whiteList = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://www.google.com',
    ];

    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('CORS politikası tarafından engellendiniz!'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeader: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Request log middleware
app.use(logger);

// Request error log middleware
app.use(errorHandler);

// Middleware to parse JSON badies
app.use(express.json());

// Content-Type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

const filePath = 'data.json';

const readData = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

const writeData = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

app.get('/api/users', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/api/users', (req, res) => {
  const users = readData();
  const newUsers = [...users, req.body];

  writeData(newUsers);

  res.json(newUsers);
});

app.put('/api/users', (req, res) => {
  const { id: userId, email } = req.body;
  let users = readData();
  const findUser = users.find((user) => user.id === userId);

  if (findUser) {
    users = users.map((user) => {
      if (user.id === findUser.id) {
        return { ...user, email };
      }
      return user;
    });

    writeData(users);
    res.json({ success: true, users });
  } else {
    res.json({ success: false, message: 'Kullanıcı Bulunamadı!' });
  }
});

app.put('/api/users/:userId', (req, res) => {
  const { email } = req.body;
  const { userId } = req.params;

  console.log(typeof userId);

  const findUser = users.find((user) => user.id === Number(userId));

  if (findUser) {
    users = users.map((user) => {
      if (user.id === findUser.id) {
        return { ...user, email };
      }
      return user;
    });
    res.json({ success: true, users });
  } else {
    res.json({ success: false, message: 'Kullanıcı Bulunamadı!' });
  }
});

app.delete('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  let users = readData();

  users = users.filter((user) => user.id !== Number(userId));

  writeData(users);

  res.status(200).json(users);
});

app.get('/add-new-user', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/submit', (req, res) => {
  const users = readData();
  const { name, age, email } = req.body;
  const newUsers = [
    ...users,
    { id: users[users.length - 1].id + 1, name, age, email },
  ];

  writeData(newUsers);

  res.send('Form verileri eklendi!');
});

app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});
