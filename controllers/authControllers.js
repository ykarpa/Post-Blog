require('dotenv').config();
let User = require("../models/userModel");
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
  res.render('login', { user: req.user, title: "Login" });
};

exports.getRegistration = (req, res) => {
  res.render('registration', { title: 'Registration' });
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Користувача з таким email не знайдено' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неправильний пароль' });
    }

    res.locals.user = user;

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при авторизації користувача' });
  }
};

exports.registerUser = async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Користувач з таким email вже існує' });
      }
  
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Пароль повинен містити принаймні одну цифру, одну літеру верхнього регістру та одну літеру нижнього регістру і мати мінімум 8 символів' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ email, password: hashedPassword, firstName, lastName });
    await newUser.save();
  
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Помилка при реєстрації користувача' });
    }
  };