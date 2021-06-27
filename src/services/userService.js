import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUserData = async (req, res) => {
  let { firstname, lastname, email, dob, phone, password } = req.body;

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      const userCreate = new User({
        firstname,
        lastname,
        email,
        dob,
        phone,
        profile: req.file.filename,
        password: hash,
      });
      await userCreate
        .save()
        .then((data) => {
          if (!data) {
            return res.status(500).json({
              message: "Something Went Wrong.",
            });
          }

          return res.status(201).json({
            message: "User Created.",
          });
        })
        .catch((err) =>
          res.status(500).json({
            message: err.message,
          })
        );
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const showUserData = (userid, res) => {
  User.findById(userid)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Record not found",
        });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

export const updateUserData = async (req, res, userid) => {
  try {
    await User.findByIdAndUpdate(userid, req.body, { upsert: true })
      .then((response) => {
        if (!response) {
          return res.status(404).json({
            message: "Id Not Found.",
          });
        }
        return res.status(200).json({
          message: "User Updated.",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
