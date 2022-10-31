import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import {theme} from "../styles/Theme";
export default function Admin() {
    const [users,setUsers] = useState([]);
    
    const fetchUsers = async () => {
        const response  = await fetch("https://vast-garden-06972.herokuapp.com/users/allUsers", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        });
        const res = await response.json();
        setUsers(res);
    }
    
    useEffect(()=>{
        fetchUsers();
    });
    return (
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>Blocked</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user=> {
                            return(
                                <TableRow>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.admin}</TableCell>
                                    <TableCell>{user.blocked}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}