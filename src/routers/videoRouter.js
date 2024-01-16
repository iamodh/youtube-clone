import express from "express";
import {
  getVideoUpload,
  postVideoUpload,
  videoWatch,
  getVideoEdit,
  postVideoEdit,
  videoDelete,
} from "../controllers/videoControllers";
import { privateMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(privateMiddleware)
  .get(getVideoUpload)
  .post(postVideoUpload);
videoRouter.get("/:id([0-9a-f]{24})", videoWatch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(privateMiddleware)
  .get(getVideoEdit)
  .post(postVideoEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(privateMiddleware)
  .delete(videoDelete);

export default videoRouter;
