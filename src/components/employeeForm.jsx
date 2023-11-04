import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  addNewEmpFormValidation,
  updateEmpFormValidation,
} from "../validations/employeeForm";
import { $crud, setDataOrError } from "../crud";
import { useContext, useEffect, useState } from "react";
import { GlobalContaxt } from "../App";

export const EmployeeForm = ({ data }) => {
  const { setError } = useContext(GlobalContaxt);
  const [departmentList, setDepartmentList] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(
      data ? updateEmpFormValidation : addNewEmpFormValidation
    ),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      department: data?.department,
      location: data?.location,
    },
  });

  const fetchDepartmentList = async () => {
    const res = await $crud.get("/department/get");
    setDepartmentList(res?.data);
  };

  const submitForm = async (formData) => {
    const res = data
      ? await $crud.put("/manager/update-employee", {
          ...formData,
          id: data?._id,
        })
      : await $crud.post("/manager/add-employee", formData);
    setDataOrError({ data: res, setError });
  };

  useEffect(() => {
    fetchDepartmentList();
  }, []);
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          {data ? "Update Employee Details" : "Add New Employee"}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
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
                name="department"
                fullWidth
                value={watch("department")}
                {...register("department")}
                error={errors?.department?.message}
                helperText={errors?.department?.message}
              >
                {departmentList?.map((department) => {
                  return (
                    <MenuItem key={department?.name} value={department?._id}>
                      {department?.name}
                    </MenuItem>
                  );
                })}

                <MenuItem value={"testing"}>Testing</MenuItem>
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
                required={!data}
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="location"
                label="Location"
                type="text"
                id="location"
                {...register("location")}
                error={errors?.location?.message}
                helperText={errors?.location?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="designation"
                label="Designation"
                type="text"
                id="designation"
                {...register("designation")}
                error={errors?.designation?.message}
                helperText={errors?.designation?.message}
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
            {data ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
