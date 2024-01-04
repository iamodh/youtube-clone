import express from "express";
import {
  userEdit,
  userChangePassword,
  userProfile,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/:id", userProfile);
userRouter.get("/:id/edit", userEdit);
userRouter.get("/:id/change-password", userChangePassword);

export default userRouter;
