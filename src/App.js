import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import AddCollection from "./pages/AddCollection";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/system";
const theme= createTheme({
  mode:"light"
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/addCollection" element={<AddCollection/>}/>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
