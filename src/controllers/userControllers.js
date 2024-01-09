import User from "../models/User";
import Video from "../models/Video";

export const userProfile = async (req, res) => {
  const {
    params: { id },
  } = req;
  const foundUser = await User.findById(id).populate("videos");
  return res.render("users/profile", {
    pageTitle: "Profile",
    videos: foundUser.videos,
  });
};
export const userChangePassword = (req, res) => {
  return res.send("<h1>This will be a user change password page</h1>");
};
export const userEdit = (req, res) => {
  return res.send("<h1>This will be a user edit page</h1>");
};
