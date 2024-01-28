import multer from "multer";

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

export const avatarMulterMiddleware = multer({
  dest: "uploads/avatars",
  limits: { FileSize: 20000000 },
});
