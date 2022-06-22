/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { WeatherSingleCard } from "../components/WeatherSingleCard";


const Test: React.FC<{}> = () => {


  return (
    <React.Fragment>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ background: "white", color: "black" }}>
          <NavLink to="/">
            <Button
              variant="contained"
              sx={{ borderRadius: "50%", minWidth: 40, maxHeight: 40 }}
            >
              <Typography variant="h5">&lsaquo;</Typography>
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <WeatherSingleCard/>
    </React.Fragment>
  );
};

export { Test };
