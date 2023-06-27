import React, {useState} from 'react';
import Meta from "@/src/components/ui/Meta";
import Layout from "@/src/components/ui/Layout";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ICreateBook} from "@/src/types/books.interface";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {TextareaAutosize} from "@mui/material";
import {styled} from "@mui/system";
import {useActions} from "@/src/hooks/useActions";

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  background-color: #efefef;
  border-radius: 5px;
  margin-top: 13px;
  
  ::placeholder {
    padding: 16px 0 16px 10px;
  }
`;

const Admin = () => {
    const {createBook} = useActions()
    const {register: formRegister, handleSubmit, formState, reset, control } = useForm<ICreateBook>({
        mode: "onChange"
    })
    const onSubmit: SubmitHandler<ICreateBook> = (data: ICreateBook) => {
        createBook(data)
        reset();
    }

    return (
        <Meta title={"Admin"}>
            <Layout>
                <Container maxWidth="sm" sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px",
                    backgroundColor: "#efefef",
                    borderRadius: "20px"

                }}>
                    <Typography variant={"h5"}>Додати нову книжку</Typography>
                    <form encType="multipart/form-data" method="POST" action="/your-endpoint"
                          onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Введіть назву книги"
                            type="text"
                            id="title"
                            {...formRegister("title", {
                                required: "Field can not be empty",
                            })}
                            error={!!formState.errors.title?.message}
                            helperText={formState.errors.title?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Введіть автора книги"
                            type="text"
                            id="author"
                            {...formRegister("author", {
                                required: "Field can not be empty"
                            })}
                            error={!!formState.errors.author?.message}
                            helperText={formState.errors.author?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Введіть складність книги від 1 до 3"
                            type="number"
                            id="difficulty"
                            {...formRegister("difficulty", {
                                required: "Field can not be empty",
                                min: 1,
                                max: 3
                            })}
                            error={!!formState.errors.difficulty?.message}
                            helperText={formState.errors.difficulty?.message}
                        />
                        <StyledTextarea
                            placeholder={"Вставте сюди опис книги"}
                            maxRows={3}
                            minRows={3}
                            style={{width: '100%', backgroundColor: "#efefef", borderRadius: "5px", marginTop: "13px"}}
                            {...formRegister("description", {
                                required: "Field can not be empty"
                            })}
                        />
                        <StyledTextarea
                            placeholder={"Вставте сюди текст книги"}
                            maxRows={3}
                            minRows={3}
                            style={{width: '100%', backgroundColor: "#efefef", borderRadius: "5px", marginTop: "13px"}}
                            {...formRegister("text", {
                                required: "Field can not be empty"
                            })}
                        />
                        <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                            <Typography sx={{fontWeight: "500", fontSize: "18px", color:"#525252"}}>
                                Додайте обкладинку
                            </Typography>
                            <Controller
                                control={control}
                                render={({ field }) => (
                                    <input
                                        name="coverImage"
                                        type="file"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                field.onChange(e.target.files[0])
                                            }}
                                    }
                                    />
                                )}
                                {...formRegister("coverImage", {
                                    required: "Field can not be empty"
                                })}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{mt: 3, mb: 2}}
                        >
                            Додати
                        </Button>
                    </form>
                </Container>
            </Layout>
        </Meta>
    );
};

export default Admin;