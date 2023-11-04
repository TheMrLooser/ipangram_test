import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createDepartmentValidation } from "../validations/department";
import { $crud, setDataOrError } from "../crud";
import { useContext, useEffect, useState } from "react";
import { GlobalContaxt } from "../App";

export const DepartmentForm = ({ data }) => {
  const { setError } = useContext(GlobalContaxt);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(createDepartmentValidation),
    defaultValues: {
      name: data?.name,
      description: data?.description,
    },
  });

  const submitForm = async (formData) => {
    const res = data
      ? await $crud.put(`/department/update`, { ...formData, id: data?._id })
      : await $crud.post(`/department/create`, formData);
    setDataOrError({ data: res, setError });
    res?.success && reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add New Department
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register("name")}
                error={errors?.name?.message}
                helperText={errors?.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                {...register("description")}
                error={errors?.description?.message}
                helperText={errors?.description?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            onClick={handleSubmit(submitForm)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {data ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
