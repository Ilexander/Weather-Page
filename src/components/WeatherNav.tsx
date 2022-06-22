/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Search } from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Button,
  FormControl,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCurrentCity } from "../store/weatherListSlice";

export interface IPropsNav {
  setDisabled: (arg: boolean) => void;
}

const WeatherNav: React.FC<IPropsNav> = (props) => {
  const { currentStatus } = useAppSelector((state) => state.weatherList);
  const [value, newValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    newValue(e.target.value);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newValue("");
    dispatch(fetchCurrentCity(value));
    props.setDisabled(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar sx={{ background: "white", color: "black" }}>
          <Typography variant="h6" component="div">
            Weather
          </Typography>
          <FormControl
            component="form"
            onSubmit={submitForm}
            sx={{ display: "flex", mx: "auto", flexDirection: "row" }}
          >
            <TextField
              sx={{ mx: "auto", display: "block" }}
              label="Contry/City"
              id="outlined-size-small"
              value={value}
              onChange={handleChange}
              size="small"
            />
            <Button type="submit" sx={{ ml: 1 }} variant="contained">
              <Search sx={{ fill: "white" }}></Search>
            </Button>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Alert
        severity="error"
        sx={{ display: currentStatus === "rejected" ? "flex" : "none" }}
      >
        This request does not exist or check your connection!
      </Alert>
    </Box>
  );
};

export { WeatherNav };
