import { ThemeProvider, createTheme, Box } from "@mui/material";
import TopBar from "../components/TopBar"
export default function Dashboard() {

    const theme = createTheme({
        palette: {
            mode: "light",
        },
    })

    return (
      
        <ThemeProvider theme={theme}>
            <Box>
                <TopBar/>
            </Box>
        </ThemeProvider>
    )
}