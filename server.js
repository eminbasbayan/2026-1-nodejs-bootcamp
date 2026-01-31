const express = require('express');
const app = express();
const path = require('node:path');
const PORT = 3000;

// Middleware to parse JSON badies
app.use(express.json());

let users = [
  { id: 1, name: 'Ahmet', age: 25, email: 'ahmet@example.com' },
  { id: 2, name: 'Ayşe', age: 30, email: 'ayse@example.com' },
];

app.get('/', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  console.log(req.body);
  const newUsers = [...users, req.body];

  res.json(newUsers);
});

app.put('/api/users', (req, res) => {
  const { id: userId, email } = req.body;

  const findUser = users.find((user) => user.id === userId);

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

app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});
