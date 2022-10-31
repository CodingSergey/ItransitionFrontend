import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import TopBar from "../components/TopBar";
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
        const res = response.json();
        console.log(res);
        setCollections(res);
    }
    useEffect(()=>{
        
    }); 
    return(
        <Container justifycontent="center">
            <TopBar/>
            
        </Container>
    )
}