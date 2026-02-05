const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, '..', 'models', 'data.json');

const readData = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

const writeData = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

const getAllUsers = (req, res) => {
  const data = readData();
  res.json(data);
};

const createNewUser = (req, res) => {
  const users = readData();
  const newUsers = [...users, req.body];

  writeData(newUsers);

  res.json(newUsers);
};

const updateUser = (req, res) => {
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
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  let users = readData();

  users = users.filter((user) => user.id !== Number(userId));

  writeData(users);

  res.status(200).json(users);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
