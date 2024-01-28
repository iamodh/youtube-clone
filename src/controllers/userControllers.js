import User from "../models/User";
import Video from "../models/Video";

export const userProfile = async (req, res) => {
  const {
    params: { id },
  } = req;
  const foundUser = await User.findById(id).populate("videos");
  return res.render("users/profile", {
    pageTitle: foundUser.name,
    videos: foundUser.videos,
    user: foundUser,
  });
};

export const getUserEdit = (req, res) => {
  return res.render("users/edit", {
    pageTitle: "Edit",
  });
};

export const postUserEdit = async (req, res) => {
  const {
    body: { name, location },
    session: { loggedInUser },
  } = req;

  const updatedUser = await User.findByIdAndUpdate(
    loggedInUser._id,
    {
      name,
      location,
    },
    { new: true } // assign updated user to variable
  );
  req.session.loggedInUser = updatedUser;
  return res.redirect(`/users/${loggedInUser._id}`);
};

export const getChangePassword = (req, res) => {
  return res.send("<h1>This will be a user change password page</h1>");
};
export const postChangePassword = (req, res) => {
  return res.send("<h1>Password Changed.</h1>");
};
