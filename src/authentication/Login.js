import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Typography, ThemeProvider } from "@mui/material";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import {theme} from "../styles/Theme";
const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
})

export default function Login() {
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [bad, setBad] = useState(false);
    const onSubmit = async (info) => {
        const { email, password } = info;
        const response = await fetch("https://vast-garden-06972.herokuapp.com/auth/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "_email": email, "_password": password })
        });
        const res = await response.json();
        if (res.token) {
            let admin = jwt_decode(res.token).admin;
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", email);
            localStorage.setItem("admin", admin);
            setBad(false);
            window.location.href = "/";
        }
        else {
            setBad(true);
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container justifycontent="center">
                <Typography sx={{ color: "red" }}>{bad && "Bad credentials"}</Typography> <br />
                <form onSubmit={handleSubmit(onSubmit)}>
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