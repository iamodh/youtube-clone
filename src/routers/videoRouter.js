import express from "express";
import {
  getVideoUpload,
  postVideoUpload,
  videoWatch,
  getVideoEdit,
  postVideoEdit,
  videoDelete,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getVideoUpload).post(postVideoUpload);
videoRouter.get("/:id([0-9a-f]{24})", videoWatch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getVideoEdit)
  .post(postVideoEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", videoDelete);

export default videoRouter;
