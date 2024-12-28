import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Box, TextField } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  DataGrid,
  GridColumnMenu,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  useGridApiContext,
} from "@mui/x-data-grid";

import { medicine } from "./Data";
import _ from "lodash";

const useStyles = makeStyles({
  root: {
    height: 400, // Set table height
    width: "100%", // Full width
    margin: "20px auto", // Centering the table
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#f5f5f5",
      color: "#333",
      fontWeight: "bold",
    },
    "& .MuiDataGrid-cell": {
      textAlign: "center",
    },
  },
});

const DataTable = () => {
  const [rows, setRows] = useState(medicine);
  const [searchText, setSearchText] = useState("");
  const debounceSearch = useCallback(
    _.debounce((value) => {
      // Filter rows based on Generic Name
      const filteredRows = medicine.filter((row) =>
        row["Generic Name"].toLowerCase().includes(value.toLowerCase())
      );
      setRows(filteredRows);
    }, 500), // 500ms debounce delay
    []
  );
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
    debounceSearch(value);
  };

  const columns = [
    { field: "Id", headerName: "Sr no", width: 100 },
    { field: "Group Name", headerName: "Group Name", width: 150 },
    {
      field: "MRP (in Rs.)",
      headerName: "MRP (in Rs.)",
      width: 150,
      align: "right",
    },
    { field: "Unit Size", headerName: "Unit Size", width: 120 },
    { field: "Generic Name", headerName: "Generic Name", width: 1200 },
  ];
  console.log(rows, "77");
  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "16px" }}
        value={searchText}
        onChange={handleSearch}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.Id}
        editMode="row"
        //hideFooterPagination
        pagination={true}
        //sx={customStyle.dataGridContainer}
        hideFooterSelectedRowCount={true}
        slots={{
          toolbar: CustomToolbar,
          columnMenu: CustomColumnMenu,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // components={{
        //   LoadingOverlay: CustomLoadingOverlay,
        // }}
        componentsProps={{
          row: {
            style: { cursor: "pointer" },
          },
        }}
      />
    </div>
  );
};
function CustomFilterItem(props) {
  const { onClick, colDef } = props;
  const apiRef = useGridApiContext();
  const handleClick = React.useCallback(
    (event) => {
      apiRef.current.showFilterPanel(colDef.field);
      onClick(event);
    },
    [apiRef, colDef.field, onClick]
  );
  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <CustomIcon
          url="https://media.pace-os.com/icons/svg/filter-three-line-icon-24x24.svg"
          fontSize="small"
        />
      </ListItemIcon>
      <ListItemText>Filter</ListItemText>
    </MenuItem>
  );
}

const CustomIcon = ({ url }) => {
  console.log(url, "hello url");
  return (
    <Avatar
      src={url}
      sx={{
        width: "2.5rem",
        height: "2.5rem",
      }}
    />
  );
};

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
  </GridToolbarContainer>
);

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .no-rows-primary": {
    fill: "#3D4751",
    ...theme.applyStyles("light", {
      fill: "#AEB8C2",
    }),
  },
  "& .no-rows-secondary": {
    fill: "#1D2126",
    ...theme.applyStyles("light", {
      fill: "#E8EAED",
    }),
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 452 257"
        aria-hidden
        focusable="false"
      >
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>No rows</Box>
    </StyledGridOverlay>
  );
}
function CustomColumnMenu(props) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuFilterItem: CustomFilterItem,
        //columnMenuColumnsItem: CustomManageColumnsItem,
      }}
    />
  );
}
export default DataTable;
