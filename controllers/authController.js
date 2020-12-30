const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  // ! Duplicate
  if (err.code === 11000) {
    errors.email = 'Email already registered!';
    return errors;
  }

  // ! Validation Errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// ! Files here will be registered in the authRoutes file
module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email,
      password,
    });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  res.send('User Login!');
};
