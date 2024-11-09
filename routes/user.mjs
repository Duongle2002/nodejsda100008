import express from "express";
import UserController from "../controllers/user_controller.mjs";
const userRouter = express.Router();

userRouter.get("/", UserController.index);

userRouter.get("/new", UserController.new);
userRouter.post("/create", UserController.create);
userRouter.get("/delete/:id", UserController.delete);
userRouter.get("/edit/:id", UserController.edit);
userRouter.put("/update/:id", UserController.update);

export default userRouter;
