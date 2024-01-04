import express from "express";
import {
  videoUpload,
  videoWatch,
  videoEdit,
  videoDelete,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/upload", videoUpload);
videoRouter.get("/:id", videoWatch);
videoRouter.get("/:id/edit", videoEdit);
videoRouter.get("/:id/delete", videoDelete);

export default videoRouter;
