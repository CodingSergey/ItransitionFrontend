import { CheckBox } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider,Button } from "@mui/material";
import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
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
    const deleteUser= (id) => {
        fetch("https://vast-garden-06972.herokuapp.com/users/deleteuser/" + id, {
            method:"DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        window.location.reload(false);        
    }
    const blockUser = (id) => {
        fetch("https://vast-garden-06972.herokuapp.com/users/toggleblock/" + id, {
            method: "PUT",
            mode: "cors",
            headers:{
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        window.location.reload(false);
    }
    const adminUser = (id) => {

    }
    useEffect(()=>{
        fetchUsers();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Toggle Admin</TableCell>
                            <TableCell>Toggle Block</TableCell>
                            <TableCell>Delete User</TableCell>
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
                                    <TableCell><Button variant="outlined" onClick={()=>adminUser(user._id)}>Toggle Admin</Button></TableCell>
                                    <TableCell><Button variant="outlined" onClick={()=>blockUser(user._id)}>Toggle Block</Button></TableCell>
                                    <TableCell><Button variant="outlined" onClick={()=>deleteUser(user._id)}> Delete</Button></TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.admin ? "Yes" : "No"}</TableCell>
                                    <TableCell>{user.blocked ? "Yes" : "No"}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}