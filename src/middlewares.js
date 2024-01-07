export const localsMiddleware = (req, res, next) => {
  res.locals.loggedInUser = {};
  if (req.session.isLoggedIn) {
    res.locals.loggedInUser = req.session.loggedInUser;
    res.locals.isLoggedIn = req.session.isLoggedIn;
  }
  return next();
};
