export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#ffffff" : ""}`,
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#322835" : "white"}`,
      },
    },
    "& .MuiButtonBase-root ": {
      color: `${isDarkMode ? "#F3F1F4" : ""}`,
    },
    "& .MuiTablePagination-root": {
      backgroundColor: `${isDarkMode ? "#beb6c0" : ""}`,
      color: `${isDarkMode ? "#2d242f" : ""}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#57475b" : ""}`,
    },

    "& .MuiIconButton-root": {
      color: `${isDarkMode ? "white" : "#221c24"}`,
    },
    "& .MuiDataGrid-cell": {
      border: `${isDarkMode ? "none" : ""}`,
    },
    '& .MuiDataGrid-cell[data-field="priority"]': {
      textAlign: "left",
    },
    "& .MuiDataGrid-row": {
      backgroundColor: `${isDarkMode ? "#beb6c0" : ""}`,
      borderBottom: `1px solid ${isDarkMode ? "#57475b" : "e5e7eb"}`,
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: `${isDarkMode ? "#cbc2cd" : ""}`,
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "#57475b" : "e5e7eb"}`,
    },
  };
};
