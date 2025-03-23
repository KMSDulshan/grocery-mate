import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "green",
        color: "white",
        height: "100vh",
        padding: 2,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 8 }}>
        Menu
      </Typography>

      <List>
        <ListItem button component={Link} to="/SupplierManagement" className="hover:bg-green-700 transition">
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>

        <ListItem button component={Link} to="/ordersmanagement" className="hover:bg-green-700 transition">
          <ListItemIcon sx={{ color: "white" }}>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem button component={Link} to="/report" className="hover:bg-green-700 transition">
          <ListItemIcon sx={{ color: "white" }}>
            <PictureAsPdfIcon />
          </ListItemIcon>
          <ListItemText primary="Generate Report" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;