import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import TopBar from "../components/TopBar";
import { ThemeProvider } from "@mui/material";
import {theme} from "../styles/Theme";
export default function Profile() {
    const [collections, setCollections] = useState();
    const fetchCollections = async () => {
        const response = await fetch("https://vast-garden-06972.herokuapp.com/collection/addcollection", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({_author: localStorage.getItem("username")})
        })
        const res = await response.json();
        console.log(res);
        setCollections(res);
    }
    useEffect(()=>{
        fetchCollections();
    }); 
    return(
        <ThemeProvider theme={theme}>
        <Container justifycontent="center">
            <TopBar/>
            
        </Container>
        </ThemeProvider>
    )
}