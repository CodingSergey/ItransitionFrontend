import { useEffect, useState } from "react";
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import TopBar from "../components/TopBar";
import { ThemeProvider,Button } from "@mui/material";
import {theme} from "../styles/Theme";
export default function Profile() {
    const [collections, setCollections] = useState([]);
    const fetchCollections = async () => {
        const response = await fetch("https://vast-garden-06972.herokuapp.com/collection/usercollections", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({_author: localStorage.getItem("username")})
        })
        const res = await response.json();
        setCollections(res);
    }
    useEffect(()=>{
        fetchCollections();
    }); 
    return(
        <ThemeProvider theme={theme}>
        <Container justifycontent="center">
            <TopBar/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Collection name</TableCell>
                            <TableCell>Number of items</TableCell>
                            <TableCell>Topic</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {collections.map(collection=>{
                            return(
                                <TableRow>
                                    <TableCell>{collection.name}</TableCell>
                                    <TableCell>{collections.items ? collection.items : 0}</TableCell>
                                    <TableCell>{collection.topic}</TableCell>
                                    <TableCell><Button>Edit</Button></TableCell>
                                    <TableCell><Button>Add Item</Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </ThemeProvider>
    )
}