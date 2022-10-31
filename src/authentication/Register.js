import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 
import { Controller, useForm } from "react-hook-form";
import { TextField, Button, ThemeProvider } from "@mui/material";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import {theme} from "../styles/Theme";

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
})

export default function Register() {
    const [data, setData] = useState();
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const onSubmit = (info) => {
        const {username,email,password } = info;
        fetch("http://vast-garden-06972.herokuapp.com/auth/exists",
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "_email": email })
            }).then(response => response.json()).then(data => setData(data));
        if (data == "exists") { 
            return;
         } else {
            fetch("http://vast-garden-06972.herokuapp.com/auth/register", {
                method:"POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"_username": username,"_email":email, "_password":password})
            }).then(response=>response.json()).then(data=>console.log(data));
            window.location.href="/login";
         }
    }

    return (
        <ThemeProvider theme={theme}>
        <Container justifycontent="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="username"
                    control={control}
                    defaultValue="Username"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Username"
                            variant="outlined"
                            error={!!errors.username}
                            helperText={errors.username ? errors.username?.message : ""}

                        />
                    )}
                />
                <br />
                <br />
                <Controller
                    name="email"
                    control={control}
                    defaultValue="Email"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email ? errors.email?.message : ""}

                        />
                    )}
                />
                <br />
                <br />
                <Controller
                    name="password"
                    control={control}
                    defaultValue="Password"
                    render={({ field }) => (
                        <TextField
                            type="password"
                            {...field}
                            label="Password"
                            variant="outlined"
                            error={!!errors.password}
                            helperText={errors.password ? errors.password?.message : ""}

                        />
                    )}
                />
                <br />
                <br />
                <Button type="submit" variant="outlined">Submit</Button>
            </form>


        </Container>
        </ThemeProvider>

    );
}