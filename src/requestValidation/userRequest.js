import { Validator } from "node-input-validator";

export const userValidation = (data) => {
  const v = new Validator(data, {
    firstname: "required",
    email: "email|required",
    dob: "required",
    phone: "integer",
    profile: "required",
  });
  return v;
};

export const userUpdateValidation = (data) => {
  const v = new Validator(data, {
    firstname: "required",
    email: "email|required",
    dob: "required",
    phone: "integer",
  });
  return v;
};
