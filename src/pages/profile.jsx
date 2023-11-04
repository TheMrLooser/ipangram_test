import { ViewEmpDetails } from "../components/viewemployeeDetail";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Profile = () => {
  const { userData } = useLocalStorage();
  return <ViewEmpDetails data={userData} />;
};
