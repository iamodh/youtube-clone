import User from "../models/User";
import Video from "../models/Video";

import bcrypt from "bcrypt";

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
    file,
  } = req;

  console.log(file);

  const updatedUser = await User.findByIdAndUpdate(
    loggedInUser._id,
    {
      name,
      location,
      avatarUrl: file ? `/${file.path}` : avatarUrl,
    },
    { new: true } // assign updated user to variable
  );
  req.session.loggedInUser = updatedUser;
  return res.redirect(`/users/${loggedInUser._id}`);
};

export const getChangePassword = async (req, res) => {
  const { id } = req.params;
  return res.render(`users/changePassword`, {
    pageTitle: "Change password",
  });
};
export const postChangePassword = async (req, res) => {
  try {
    const {
      session: { loggedInUser },
      body: { oldPassword, newPassword, newPasswordConfirm },
    } = req;
    const foundUser = await User.findById(loggedInUser._id);
    const oldPasswordMatch = bcrypt.compare(oldPassword, foundUser.password);
    if (!oldPasswordMatch) {
      return res.render("users/changePassword", {
        pageTitle: "Change password",
        errorMessage: "Old password doesn't match.",
      });
    }
    if (newPassword !== newPasswordConfirm) {
      return res.render("users/changePassword", {
        pageTitle: "Change password",
        errorMessage: "Password confirm doesn't match.",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(loggedInUser._id, {
      password: newPassword,
    });
    return res.redirect(`/users/${loggedInUser._id}`);
  } catch (error) {
    console.log("postChangePassword error.");
    return res.status(400).render("users/changePassword", {
      pageTitle: "Change password",
      errorMessage: "Failed to change password",
    });
  }
};
