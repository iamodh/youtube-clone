export const localsMiddleware = (req, res, next) => {
  res.locals.loggedInUser = {};
  if (req.session.isLoggedIn) {
    res.locals.loggedInUser = req.session.loggedInUser;
    res.locals.isLoggedIn = req.session.isLoggedIn;
  }
  return next();
};

export const publicMiddleware = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const privateMiddleware = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
