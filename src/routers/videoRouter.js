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
videoRouter.get("/:id([0-9a-f]{24})", videoWatch);
videoRouter.get("/:id([0-9a-f]{24})/edit", videoEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", videoDelete);

export default videoRouter;
