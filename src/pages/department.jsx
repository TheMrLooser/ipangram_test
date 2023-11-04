import { Box, Button } from "@mui/material";
import { DepartmentForm } from "../components/departmentForm";
import { TabComponent } from "../components/tabComponent";
import TableComponent from "../components/table";
import { Suspense, useContext, useEffect, useState } from "react";
import { $crud, setDataOrError } from "../crud";
import { GlobalContaxt } from "../App";

export const Department = () => {
  const { setError } = useContext(GlobalContaxt);
  const [departmentList, setDepartmentList] = useState([]);
  const [switchIn, setSwitchIn] = useState({});

  const getDepartmentList = async () => {
    const list = await $crud.get("/department/get");
    setDepartmentList(list?.data);
  };

  useEffect(() => {
    getDepartmentList();
  }, []);
  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "name", sortable: true, headerName: "name", width: 230 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "employee", headerName: "Employee", width: 130 },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={async () => {
                const res = await $crud.delete(
                  `/department/delete?id=${params.row?._id}`
                );
                setDataOrError({ data: res, setError });
                res?.success && getDepartmentList();
              }}
            >
              delete
            </Button>
            <Button
              onClick={async () => {
                setSwitchIn({ id: 1, data: params.row });
              }}
            >
              update
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <TabComponent
        switchIn={switchIn}
        setSwitchIn={setSwitchIn}
        HeadList={["All Department", "Add new"]}
        Element={[
          <Suspense fallback={<p>Loading...</p>}>
            <TableComponent columns={columns} data={departmentList} />
          </Suspense>,
          <DepartmentForm data={switchIn?.data} />,
        ]}
      />
    </Box>
  );
};
