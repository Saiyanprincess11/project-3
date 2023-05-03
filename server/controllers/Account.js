const models = require('../models');

const { Account } = models;
const loginPage = (req, res) => res.render('login');
const homePage = (req, res) => res.render('home');
const contactPage = (req, res) => res.render('contact'); 
const aboutPage = (req, res) => res.render('about'); 
const accountSettingsPage = (req, res) => res.render('accountSettings'); 


//Signs user out of account and returns to main page 
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
// Login Information
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};
// Validates password data
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // Checks to see if passwords match
  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Tries to create a new user with username & password
  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash, accountType: 'basic' });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) { // Otherwise handles any error thrown
    console.log(err);

    // If username has already been used...
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};


// -- To Fix --
// Changes password
const changePassword = async (req, res) => {
  // const username = `${req.body.username}`;
  const newPass = `${req.body.newPass}`;
  const confirmPass = `${req.body.confirmPass}`;

  //Values are missing 
  if (!newPass || !confirmPass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  //Password and re entered password dont match 
  if(newPass !== confirmPass){
    return res.status(400).json({ error: 'Password was re-entered incorrectly!' });
  }
  const query = {
    username: req.session.account.username, 
    accountType: req.session.account.accountType, 
  }
  const hash = await Account.generateHash(newPass);

  //Upates Password
  try {
    //Changes password 
    await Account.find(query).updateOne(
      {$push: {password: hash}},
    )

    //reverifies accoount 
    return res.redirect('/logout'); 
  } catch (err) { // Otherwise handles any error thrown
    console.log(err);
    return res.status(500).json({ error: 'An error occured!' });
  }
 
};

module.exports = {
  loginPage,
  homePage,
  accountSettingsPage,
  login,
  logout,
  signup,
  changePassword,
  contactPage, 
  aboutPage, 
};
