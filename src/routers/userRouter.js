import express from "express";
import {
  getUserEdit,
  postUserEdit,
  userProfile,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";
import { privateMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/:id", userProfile);
userRouter
  .route("/:id/edit")
  .all(privateMiddleware)
  .get(getUserEdit)
  .post(postUserEdit);
userRouter
  .route("/:id/change-password")
  .all(privateMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
