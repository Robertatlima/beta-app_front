import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useAuth } from "../../contexts/Auth";

const AppBarComponent = () => {
  const { isAuth } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="error">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BETA APP
          </Typography>
          <Button color="inherit">
            {isAuth ? (
              <Link to="/dashboard">Minha conta</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AppBarComponent;
