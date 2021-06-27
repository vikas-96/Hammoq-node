import { Router } from "express";
import Users from "./Users.js";

const route = Router();

route.use("/api", Users);

export default route;
