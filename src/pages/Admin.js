import { CheckBox } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import {theme} from "../styles/Theme";
export default function Admin() {
    const [users,setUsers] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
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
    const toggleCheckboxValue = (index) => {
        isChecked[index] = !isChecked[index];
    }
    useEffect(()=>{
        fetchUsers();
    });
    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>

                            <TableCell>Select</TableCell>
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
                                    <TableCell><CheckBox key={user._id} checked={isChecked[user._id]} onClick={()=>{ toggleCheckboxValue(user._id)}}></CheckBox></TableCell>
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