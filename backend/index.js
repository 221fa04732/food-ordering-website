const express = require("express");
const app = express();
const port = 3000;
const { userdata } = require('./database');
const { Uname,Uemail,Upassword,Uphone } = require('./type.js');
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const verifyEmail = Uemail.safeParse(email);
  if (!verifyEmail.success) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const verifyPassword = Upassword.safeParse(password);
  if (!verifyPassword.success) {
    return res.status(400).json({ message: 'Invalid password format' });
  }

 
  const userFound = await userdata.findOne({ email: email, password: password });
  if (!userFound) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({userFound});
});


app.post('/signin', async (req, res) => {
  const { name, email, password, phone } = req.body;

  const usernameCheck = Uname.safeParse(name);
  const emailCheck = Uemail.safeParse(email);
  const passwordCheck = Upassword.safeParse(password);
  const phoneCheck = Uphone.safeParse(phone);

  if (!usernameCheck.success || !emailCheck.success || !passwordCheck.success || !phoneCheck.success) {
    return res.status(400).json({ message: 'Invalid input provided' });
  }

  await userdata.create({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });

  res.status(201).json({ message: 'User created successfully' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
