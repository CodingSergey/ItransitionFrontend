import { Container, ThemeProvider, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { theme } from "../styles/Theme";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useEffect } from "react";
import CheckLogin from "../authentication/CheckLogin";
const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required().max(2000),
    topic: yup.string()
})

export default function AddCollectionForm() {
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const onSubmit = (info) => {
        const { name, description, topic } = info;
        console.log(name);
        console.log(description);
    }

    useEffect(()=> {
        if(!CheckLogin()) {
            
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Container justifycontent="center">
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
                                fullWidth
                                multiline={true}
                                rows={10}
                                {...field}
                                label="Description"
                                variant="outlined"
                                error={!!errors.description}
                                helperText={errors.description ? errors.description?.message : ""}

                            />
                        )}
                    />
                    <br />
                    <br />
                    <Button type="Submit" variant="outlined">Add Collection</Button>
                </form>
            </Container>

        </ThemeProvider>
    )
}