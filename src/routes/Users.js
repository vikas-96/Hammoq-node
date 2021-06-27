import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createUser,
  showUser,
  updateUser,
  destroyUser,
} from "../controllers/userController.js";
import { login, changePassword } from "../controllers/authController.js";
import { uploadDocument } from "../../utils/helpers.js";
var upload = uploadDocument("uploads/profiles");

const route = Router();

//Auth
route.post("/auth/login", login);
route.post("/change_password", verifyToken, changePassword);

//User
route.post("/user", upload.single("profile"), createUser);
route.get("/user/:id([a-z0-9]+)", verifyToken, showUser);
route.patch("/user/:id([a-z0-9]+)", verifyToken, updateUser);
route.delete("/user/:id([a-z0-9]+)", verifyToken, destroyUser);

export default route;
