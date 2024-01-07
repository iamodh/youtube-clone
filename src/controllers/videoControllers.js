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

export const videoEdit = (req, res) => {
  return res.send("<h1>This will be a video edit page</h1>");
};
export const videoWatch = (req, res) => {
  return res.send("<h1>This will be a video watch page</h1>");
};
export const videoDelete = (req, res) => {
  return res.send("<h1>This will be a video delete page</h1>");
};
