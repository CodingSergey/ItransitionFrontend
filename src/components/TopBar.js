import styled from "@emotion/styled";
import { AppBar, InputBase, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import { AccountBox } from "@mui/icons-material"
import { useState } from "react";

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
    const user =sessionStorage.getItem("user");
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky">
            <ToolBar>
                <Typography sx={{ display: { xs: "none", sm: "block" } }}>Collection Manager</Typography>
                <Search>
                    <InputBase placeholder="Search collections" />
                </Search>
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
                {user ?
                    <div>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Your Collections</MenuItem>
                        <MenuItem>Logout</MenuItem>
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