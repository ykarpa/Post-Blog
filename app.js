const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

require("dotenv").config();
let db = process.env.MONGO_URL;
let PORT = process.env.PORT;

mongoose.connect(db);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use('/public', express.static('public', { 'extensions': ['css'], 'index': false, 'setHeaders': (res, path) => res.type('text/css') }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(postRoutes);
app.use(authRoutes);

app.use('/', postRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

async function start() {
  try {
    await mongoose.connect(db);
    console.log(`Connection to MongoDb is success!`);

    app.listen(PORT, () => {
      console.log(`Server is listening PORT ${PORT}...`);
    });
  } catch (error) {
    console.log(" \n Connection error!!! \n\n", error);
  }
}

start();
