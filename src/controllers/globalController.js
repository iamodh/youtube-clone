import User from "../models/User";
import Video from "../models/Video";

import bcrypt from "bcrypt";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  console.log(videos);
  return res.render("globals/home", { pageTitle: "Home", videos });
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
      errorMessage: "Email already exists.",
    });
  }
  if (password !== password2) {
    return res.render("globals/join", {
      pageTitle: "Join",
      errorMessage: "Confirm password again.",
    });
  }

  try {
    const createdUser = await User.create({ email, password, name, location });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("/globals/join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("globals/login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("globals/login", {
      pageTitle: "Login",
      errorMessage: "Email doesn't exist.",
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).render("globals/login", {
      pageTitle: "Login",
      errorMessage: "Password doesn't match.",
    });
  }
  req.session.isLoggedIn = true;
  req.session.loggedInUser = user;
  return res.redirect("/");
};

export const search = (req, res) => {
  return res.send("<h1>This will be a search page</h1>");
};
export const logout = (req, res) => {
  return res.send("<h1>This will be a logout page</h1>");
};
