import express from "express";
import {
  getJoin,
  postJoin,
  login,
  logout,
  home,
  search,
} from "../controllers/globalController";

const rootRouter = express.Router();
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/logout", logout);
rootRouter.get("/search", search);

export default rootRouter;
