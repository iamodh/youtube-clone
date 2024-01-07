import express from "express";
import {
  getVideoUpload,
  postVideoUpload,
  videoWatch,
  videoEdit,
  videoDelete,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getVideoUpload).post(postVideoUpload);
videoRouter.get("/:id", videoWatch);
videoRouter.get("/:id/edit", videoEdit);
videoRouter.get("/:id/delete", videoDelete);

export default videoRouter;
