import { Container, ThemeProvider, TextField, Button, Select, MenuItem, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { theme } from "../styles/Theme";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useEffect, useState } from "react";
import CheckLogin from "../authentication/CheckLogin";
import Logout from "../authentication/Logout";
const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required().max(2000),
    topic: yup.string()
})

export default function AddCollectionForm() {
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [exists, setExists] = useState();
    const onSubmit = async  (info) => {
        const { name, description, topic } = info;
        console.log(name);
        console.log(description);
        console.log(topic);
        console.log(localStorage.getItem("username"));
        const response = await fetch("https://vast-garden-06972.herokuapp.com/collection/addcollection", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({_name: name, _description: description, _topic: topic, _author: localStorage.getItem("username")})
        })
        const res = await response.json();
        console.log(res);
        if(res.exists === true) {
            setExists(true);
        } else {
           
        }
    }
    const [topic, setTopic] = useState('');

    const handleChange = (event) => {
        setTopic(event.target.value);
    };
    useEffect(() => {
        if (!CheckLogin()) {
            Logout();
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Container justifycontent="center">
                <br/>
                <br/>
                <Typography color="red">{exists&& "This collection already exists"}</Typography>
                
                <br />
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                {...field}
                                label="Collection Name"
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name?.message : ""}

                            />
                        )}
                    />
                    <br />
                    <br />

                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                multiline={true}
                                rows={10}
                                fullWidth
                                {...field}
                                label="description"
                                variant="outlined"
                                error={!!errors.description}
                                helperText={errors.description ? errors.description?.message : ""}

                            />
                        )}
                    />

                    <br />
                    <br />
                    <Controller
                        control={control}
                        name="topic"
                        render={({field}) => (
                            <Select id="topic-select" {...field} >
                                <MenuItem value="Whiskeys">Whiskeys</MenuItem>
                                <MenuItem value="Staples">Staples</MenuItem>
                                <MenuItem value="Coins">Coins</MenuItem>
                                <MenuItem value="Games">Games</MenuItem>
                            </Select>)
                        }
                    />
                    
                    <br />
                    <br />
                    <Button type="Submit" variant="outlined">Add Collection</Button>
                </form>
            </Container>

        </ThemeProvider>
    )
}