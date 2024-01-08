import Video from "../models/Video";

export const getVideoUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload" });
};
export const postVideoUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
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
};

export const videoEdit = (req, res) => {
  return res.send("<h1>This will be a video edit page</h1>");
};
export const videoDelete = (req, res) => {
  return res.send("<h1>This will be a video delete page</h1>");
};
