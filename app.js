const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI =
  'mongodb+srv://Boro:galIEe04R2JG3pwn@cluster0.eutdg.gcp.mongodb.net/Node-JWT-Auth?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .then(console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {
  res.cookie('newUser', false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;

  res.json(cookies);
});
