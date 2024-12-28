export const customStyle = {
  dataGridContainer: {
    backgroundColor: "white",
    height: "fit-content",
    maxHeight: "580px",
    maxWidth: "calc(100vw - 85px)",

    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize: "1.3rem",
    },
    "& .MuiDataGrid-row": {
      cursor: "pointer",
    },
    "& .MuiDataGrid-cell": {
      borderRight: "1px solid #E8E8E8", // Horizontal lines
    },
    "& .MuiDataGrid-columnHeaders": {
      borderRight: "1px solid #E8E8E8", // Header line
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "#E6ECEF !important",
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
    "& .MuiDataGrid-filler ": {
      display: "none",
    },
    "& .MuiButtonBase-root ": {
      color: "#06425C",
    },
    "& .MuiInputLabel-root": {
      color: "#06425C",
      "&:focus": {
        color: "#06425C",
      },
    },
  },
};
