import * as yup from "yup";
export const signInFormValidation = yup.object().shape({
  email: yup
    .string()
    .required(" Please enter your email")
    .email("Please enter valid email id"),

  password: yup.string().required("Please enter password"),
});
