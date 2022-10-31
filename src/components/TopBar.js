import {styled} from "@mui/material/styles";
import { AppBar, InputBase, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import { AccountBox } from "@mui/icons-material"
import { useState } from "react";
import Logout from "../authentication/Logout";
const ToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0px, 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
}));
const Icons = styled("div")();
export default function TopBar() {
    const token =localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky">
            <ToolBar>
                <Typography sx={{ display: { xs: "none", sm: "block" } }}>Collection Manager</Typography>
                <Search>
                    <InputBase placeholder="Search collections" />
                </Search>
                <Typography>{username && "Hello " + username}</Typography>
                <Icons>
                    <AccountBox onClick={(e) => setOpen(true)} />
                </Icons>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    open={open}
                    onClose={(e) => setOpen(false)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >   
                {username ?
                    <div>
                        <MenuItem onClick={()=>window.location.href="/profile"}>Profile</MenuItem>
                        <MenuItem onClick={Logout}>Logout</MenuItem>
                        <MenuItem onClick={()=>window.location.href="/addCollection"}>Add Collection</MenuItem>
                        <MenuItem onClick={()=>window.location.href="/manager"}>{localStorage.getItem("admin")}</MenuItem>
                    </div>
                    :
                    <div>
                        <MenuItem onClick={()=>window.location.href="/login"}>Login</MenuItem>
                        <MenuItem onClick={()=>window.location.href="/register"}>Register</MenuItem>
                    </div>
                }
                    
                </Menu>
            </ToolBar>
        </AppBar>
    )
}