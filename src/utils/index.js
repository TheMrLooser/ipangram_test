export const getNavItems = ({ role }) => {
  if (role === "employee") {
    return [];
  } else if (role === "manager") {
    return [
      { name: "Dashboard", route: "/dashboard" },
      { name: "Department", route: "/department" },
    ];
  } else {
    return [{ name: "SignIn/SignUp", route: "/signin" }];
  }
};
