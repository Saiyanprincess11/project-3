
// Checks to see if user has logged in already
const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

// Checks to see if user has logged out
const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/maker');
  }
  return next();
};

// Restricts non-premium members
//Not Implemented yet
const requiresPremium = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/');
  }
  return next();
};

// Checks for secure actions
const requiresSecure = (req, res, next) => {
  // checks to see if request was secure
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

// Bypasses request check for local testing
const bypassSecure = (req, res, next) => {
  next();
};

//404 Page
const requireErrorPage = (req, res) => {
  return res.status(404).render('login'); 
}

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;
module.exports.requiresPremium = requiresPremium;
module.exports.requireErrorPage = requireErrorPage; 

// Chooses production based on environment
if (process.nextTick.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
