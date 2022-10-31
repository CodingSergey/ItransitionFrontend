export default async function CheckLogin() {
    const response = await fetch("https://vast-garden-06972.herokuapp.com/auth/check",{
        method: "POST",
        mode:"no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: localStorage.getItem("token")})
    });
    const res = await response.json();
    return res.auth;
}