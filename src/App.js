import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import AddCollection from "./pages/AddCollection";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/system";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { theme } from "./styles/Theme";
import { TopBar } from "./components/TopBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/addCollection" element={<AddCollection />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/manager" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
