import * as yup from "yup";
export const addNewEmpFormValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your firstName ")
    .matches(/^[^][aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

  email: yup
    .string()
    .required(" Please enter your email")
    .email("Please enter valid email id"),

  department: yup.string().required("Please select your department"),
  password: yup.string().required("Please enter password"),
});

export const updateEmpFormValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your firstName ")
    .matches(/^[^][aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

  email: yup
    .string()
    .required(" Please enter your email")
    .email("Please enter valid email id"),

  department: yup.string().required("Please select your department"),
  location: yup.string().required("Please provide your location"),
  designation: yup.string().required("Please provide your designation"),
});
