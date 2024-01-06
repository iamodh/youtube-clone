export const home = (req, res) => {
  return res.render("globals/home", { pageTitle: "Home" });
};
export const search = (req, res) => {
  return res.send("<h1>This will be a search page</h1>");
};
export const join = (req, res) => {
  return res.send("<h1>This will be a join page</h1>");
};
export const login = (req, res) => {
  return res.send("<h1>This will be a login page</h1>");
};
export const logout = (req, res) => {
  return res.send("<h1>This will be a logout page</h1>");
};
