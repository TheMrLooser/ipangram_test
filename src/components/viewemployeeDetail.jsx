import { Box, Container, Modal, TextField } from "@mui/material";

export const ViewEmpDetails = ({ data }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "40ch" },
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          borderRadius: "5px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Name"
          id="outlined-size-normal"
          defaultValue={data?.name}
          disabled
          fullWidth
        />
        <TextField
          fullWidth
          label="Email"
          id="outlined-size-normal"
          defaultValue={data?.email}
          disabled
        />
        <TextField
          label="Role"
          id="outlined-size-normal"
          defaultValue={data?.role}
          fullWidth
          disabled
        />
        <TextField
          label="Location"
          id="outlined-size-normal"
          defaultValue={data?.location}
          fullWidth
          disabled
        />
        <TextField
          label="Dept Name"
          id="outlined-size-normal"
          defaultValue={data?.departmentName}
          fullWidth
          disabled
        />
        <TextField
          label="Designation"
          id="outlined-size-normal"
          defaultValue={data?.designation}
          fullWidth
          disabled
        />
      </Box>
    </Container>
  );
};

export const ViewEmpDetailInModal = ({ data, open, handleClose }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <ViewEmpDetails data={data} />
      </Modal>
    </Box>
  );
};
