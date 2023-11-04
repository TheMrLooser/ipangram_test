export const useLocalStorage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("auth_token");

  return { userData, token };
};
