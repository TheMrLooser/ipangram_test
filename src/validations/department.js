import * as yup from "yup";
export const createDepartmentValidation = yup.object().shape({
  name: yup.string().required(" Please enter your name"),

  description: yup.string().required("Please enter description"),
});
