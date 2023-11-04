import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { Navbar } from "./components/navbar";
import { ThemeProvider, createTheme } from "@mui/material";
import { Dashboard } from "./pages/dashboard";
import { createContext, useState } from "react";
import { ErrorMessage } from "./components/error";
import { PrivateRoute } from "./components/managerRoute";
import { Department } from "./pages/department";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Profile } from "./pages/profile";

const defaultTheme = createTheme();

export const GlobalContaxt = createContext(null);

function App() {
  const { userData } = useLocalStorage();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(userData);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalContaxt.Provider value={{ error, setError, user, setUser }}>
        <BrowserRouter>
          <ErrorMessage error={error} setError={setError} />
          <Navbar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Profile />} />
            <Route element={<PrivateRoute authenticated={user} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/department" element={<Department />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContaxt.Provider>
    </ThemeProvider>
  );
}

export default App;
