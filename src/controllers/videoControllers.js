import User from "../models/User";
import Video from "../models/Video";

export const getVideoUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload" });
};
export const postVideoUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    session: {
      loggedInUser: { _id },
    },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const owner = await User.findById(_id);
    owner.videos.unshift(newVideo._id);
    await owner.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload",
      errorMessage: error._message,
    });
  }
};

export const videoWatch = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const foundVideo = await Video.findById(id);
    if (!foundVideo) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    return res.render("videos/watch", {
      pageTitle: foundVideo.title,
      video: foundVideo,
    });
  } catch (error) {
    console.log("videoWatch controller error");
    return res.status(404).render("404", { pageTitle: "Page not found." });
  }
};

export const getVideoEdit = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const foundVideo = await Video.findById(id);
    if (!foundVideo) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }

    return res.render("videos/edit", { pageTitle: "Edit", video: foundVideo });
  } catch (error) {
    console.log("getVideoEdit controller error");
    return res.status(404).render("404", { pageTitle: "Page not found." });
  }
};

export const postVideoEdit = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, description, hashtags },
    } = req;
    const foundVideo = await Video.findById(id);
    if (!foundVideo) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    // owner check
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
  } catch (error) {
    console.log("postVideoEdit controller error");
    return res.status(404).render("404", { pageTitle: "Page not found." });
  }
};

export const videoDelete = async (req, res) => {
  const {
    body: { id },
  } = req;
  const foundVideo = await Video.findById(id);
  if (!foundVideo) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  // owner check
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
