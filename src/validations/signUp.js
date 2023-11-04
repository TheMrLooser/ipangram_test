import * as yup from "yup";
export const signUpFormValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your firstName ")
    .matches(/^[^][aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

  email: yup
    .string()
    .required(" Please enter your email")
    .email("Please enter valid email id"),

  role: yup.string().required("Please select your role"),
  password: yup.string().required("Please enter password"),
});
