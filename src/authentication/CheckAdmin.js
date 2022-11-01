import Logout from "./Logout";

export default async function CheckLogin() {
    const response = await fetch("https://vast-garden-06972.herokuapp.com/auth/checkadmin",{
        method: "POST",
        mode:"no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({_email: localStorage.getItem("username")})
    });
    const res = await response.json();
    if(!res.admin) Logout();
}