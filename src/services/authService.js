import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const authLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({ message: "Login failed" });
      }

      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "10h" }
      );

      return res
        .status(200)
        .json({ message: "Auth successfull.", access_token: token });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const authChangePassword = async (req, res) => {
  const { id: userid } = jwt.decode(req.headers.authorization.split(" ")[1]);

  try {
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({
        message: "Record Not Found.",
      });
    }

    bcrypt.compare(req.body.old_password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(500).json({
          message: "Old Password doesn't match!",
        });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        user.password = hash;
        user
          .save()
          .then(() => {
            return res.status(200).json({
              message: "Password has been changed successfully.",
            });
          })
          .catch((failed) => {
            return res.status(500).json({ message: failed.message });
          });
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
