const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const dotenv = require('dotenv')
const { userdata } = require('./database');
const { Uname,Uemail,Upassword,Uphone } = require('./type.js');
app.use(express.json());
dotenv.config()

const cors = require('cors');
app.use(cors());

const port = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET

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

  const token = jwt.sign({ email}, JWT_SECRET);
  const verifytoken = jwt.verify(token, JWT_SECRET);

  res.status(200).json({userFound, token, verifytoken});
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
  console.log(`Server is Listining`);
});
