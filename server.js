const express = require('express');
const app = express();
const fs = require('node:fs');
const path = require('node:path');
const PORT = 3000;

// Middleware to parse JSON badies
app.use(express.json());

let users = [
  { id: 1, name: 'Ahmet', age: 25, email: 'ahmet@example.com' },
  { id: 2, name: 'Ayşe', age: 30, email: 'ayse@example.com' },
];

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

  writeData(newUsers)

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
  let users = readData()

  users = users.filter((user) => user.id !== Number(userId));

  writeData(users)

  res.status(200).json(users);
});

app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});
