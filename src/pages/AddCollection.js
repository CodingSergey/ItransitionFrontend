import { ThemeProvider,createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import AddCollectionForm from "../components/AddCollectionForm";
import TopBar from "../components/TopBar";

const theme = createTheme({
    palette: {
        mode: "light",
    },
})


export default function AddCollection() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <TopBar />
                <AddCollectionForm/>
            </Box>
        </ThemeProvider>
    )
}