import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const TableComponent = ({ data, columns, handleSort }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
        onSortModelChange={(model) => {
          handleSort && handleSort(model[0]);
        }}
      />
    </div>
  );
};

export default React.memo(TableComponent);
