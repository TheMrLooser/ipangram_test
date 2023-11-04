import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormValidation } from "../validations/signUp";
import { MenuItem, Select } from "@mui/material";
import { $crud, setDataOrError } from "../crud";
import { GlobalContaxt } from "../App";

export const SignUp = () => {
  const { setError, setUser } = React.useContext(GlobalContaxt);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(signUpFormValidation),
    defaultValues: {
      role: "employee",
    },
  });

  const submitForm = async (data) => {
    const res = await $crud.post("/auth/signup", data);
    setDataOrError({ setData: setUser, data: res, setError });
    !res.error && navigate("/dashboard");
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                name="role"
                fullWidth
                value={watch("role")}
                {...register("role")}
                error={errors?.role?.message}
                helperText={errors?.role?.message}
              >
                <MenuItem value={"employee"}>Employee</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email")}
                error={errors?.email?.message}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password")}
                error={errors?.password?.message}
                helperText={errors?.password?.message}
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/signin"} className="links">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
