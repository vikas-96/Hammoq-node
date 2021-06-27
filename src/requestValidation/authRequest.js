import { Validator } from "node-input-validator";

export const loginValidation = (data) => {
  const v = new Validator(data, {
    email: "required|email",
    password: "required",
  });
  return v;
};

export const changePasswordValidation = (data) => {
  const v = new Validator(data, {
    old_password: "required",
    password: "required",
  });
  return v;
};
