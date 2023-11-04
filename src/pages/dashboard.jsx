import { Box, Button } from "@mui/material";
import { $crud, setDataOrError } from "../crud";
import TableComponent from "../components/table";
import { Suspense, useContext, useEffect, useState } from "react";
import { TabComponent } from "../components/tabComponent";
import { EmployeeForm } from "../components/employeeForm";
import { GlobalContaxt } from "../App";
import { ViewEmpDetailInModal } from "../components/viewemployeeDetail";

export const Dashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [switchIn, setSwitchIn] = useState({});
  const { setError } = useContext(GlobalContaxt);
  const [openModel, setOpenModal] = useState(false);

  const getEmployeeList = async (sort) => {
    const list = await $crud.get(
      `/manager/get-employee-list?${
        sort && `sortField=${sort?.field}&sortOrder=${sort?.sort}`
      }`
    );
    setEmployeeList(list?.data);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", sortable: true, headerName: "name", width: 230 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "role", headerName: "Role", width: 130 },
    { field: "location", sortable: true, headerName: "Location", width: 230 },
    { field: "departmentName", headerName: "Department Name", width: 230 },
    { field: "designation", headerName: "Designation", width: 200 },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      width: 360,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={async () => {
                const res = await $crud.delete(
                  `/manager/remove-employee?id=${params?.row?._id}`
                );
                setDataOrError({ data: res, setError });
                getEmployeeList();
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setSwitchIn({ id: 1, data: params?.row });
              }}
            >
              update
            </Button>
            <Button
              onClick={() => {
                setOpenModal({ open: true, data: params?.row });
              }}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    getEmployeeList();
  }, [switchIn]);

  return (
    <Box padding={2}>
      <TabComponent
        switchIn={switchIn}
        setSwitchIn={setSwitchIn}
        HeadList={["Employee List", "Add new employee"]}
        Element={[
          <Suspense fallback={<p>Loading...</p>}>
            <TableComponent
              handleSort={(sort) => {
                getEmployeeList(sort);
              }}
              columns={columns}
              data={employeeList}
            />
          </Suspense>,
          <EmployeeForm data={switchIn?.data} />,
        ]}
      />
      <ViewEmpDetailInModal
        open={openModel?.open}
        data={openModel?.data}
        handleClose={() => {
          setOpenModal(null);
        }}
      />
    </Box>
  );
};
