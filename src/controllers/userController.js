import jwt from "jsonwebtoken";
import {
  userValidation,
  userUpdateValidation,
} from "../requestValidation/userRequest.js";
import {
  createUserData,
  showUserData,
  updateUserData,
} from "../services/userService.js";

export const createUser = async (req, res) => {
  const bodies = Object.assign(req.body, { profile: req["file"] });
  const validations = userValidation(bodies);
  const matched = await validations.check();
  if (!matched) {
    return res.status(422).json(validations.errors);
  }

  return createUserData(req, res);
};

export const showUser = (req, res) => {
  const paramsUserid = req.params.id;
  const { id: userid } = jwt.decode(req.headers.authorization.split(" ")[1]);
  if (userid !== paramsUserid) {
    res.status(404).json({
      message: "Id Not Found.",
    });
  }
  return showUserData(userid, res);
};

export const updateUser = async (req, res) => {
  const paramsUserid = req.params.id;
  const { id: userid } = jwt.decode(req.headers.authorization.split(" ")[1]);
  if (userid !== paramsUserid) {
    res.status(404).json({
      message: "Id Not Found.",
    });
  }

  const validations = userUpdateValidation(req.body);
  const matched = await validations.check();
  if (!matched) {
    return res.status(422).json(validations.errors);
  }

  return updateUserData(req, res, userid);
};

export const destroyUser = async (req, res) => {
  const userid = req.params.id;
  await User.remove({ _id: userid })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Requested id not found." });
      }
      res.status(200).json({
        message: "User Deleted.",
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
};
