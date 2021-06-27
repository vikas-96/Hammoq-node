import {
  loginValidation,
  changePasswordValidation,
} from "../requestValidation/authRequest.js";
import { authLogin, authChangePassword } from "../services/authService.js";

export const login = async (req, res) => {
  const validations = loginValidation(req.body);
  const matched = await validations.check();
  if (!matched) {
    return res.status(422).json(validations.errors);
  }

  return authLogin(req, res);
};

export const changePassword = async (req, res) => {
  const validations = changePasswordValidation(req.body);
  const matched = await validations.check();
  if (!matched) {
    return res.status(422).json(validations.errors);
  }

  return authChangePassword(req, res);
};
