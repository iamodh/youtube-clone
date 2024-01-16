import express from "express";
import {
  userEdit,
  userChangePassword,
  userProfile,
} from "../controllers/userControllers";
import { privateMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/:id", userProfile);
userRouter.get("/:id/edit", privateMiddleware, userEdit);
userRouter.get("/:id/change-password", privateMiddleware, userChangePassword);

export default userRouter;
