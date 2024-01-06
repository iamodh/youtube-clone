import User from "../models/User";

export const home = (req, res) => {
  return res.render("globals/home", { pageTitle: "Home" });
};

export const getJoin = (req, res) => {
  return res.render("globals/join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { email, password, password2, name, location } = req.body;
  const existingEmail = await User.exists({ email });
  if (existingEmail) {
    return res.render("globals/join", {
      pageTitle: "Join",
      errorMessage: "Email already exists",
    });
  }
  if (password !== password2) {
    return res.render("globals/join", {
      pageTitle: "Join",
      errorMessage: "Password doesn't match",
    });
  }

  const createdUser = await User.create({ email, password, name, location });
  return res.redirect("/login");
};

export const search = (req, res) => {
  return res.send("<h1>This will be a search page</h1>");
};
export const login = (req, res) => {
  return res.send("<h1>This will be a login page</h1>");
};
export const logout = (req, res) => {
  return res.send("<h1>This will be a logout page</h1>");
};
