/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToList } from "../store/weatherListSlice";
import { IPropsNav } from "./WeatherNav";

interface IProps extends IPropsNav {
  disabled: boolean;
  storage: string;
}

const WeatherCurrentCard: React.FC<IProps> = (props) => {
  const { currentRequest, currentStatus } = useAppSelector(
    (state) => state.weatherList
  );
  const dispatch = useAppDispatch();
  const addToStorage = (name: string) => {
    dispatch(addToList());
    const store = JSON.parse(props.storage || "[]");
    localStorage.setItem("list", JSON.stringify(store.concat(name)));
    props.setDisabled(true);
  };

  if (currentStatus === "pending") {
    return (
      <Typography variant="h4" sx={{ textAlign: "center", mb: 5 }}>
        Make your request
      </Typography>
    );
  } else {
    return (
      currentStatus === 'rejected' ? <Typography></Typography> : <Card sx={{ maxWidth: "100%", width: "100%", mb: 5 }} variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom variant="h4" component="div">
              {currentRequest?.name}
              <Typography
                variant="h5"
                component="span"
                sx={{ display: "block" }}
              >
                {currentRequest?.weather[0].main || ""}
              </Typography>
              <Typography
                variant="h6"
                component="span"
                sx={{ display: "block" }}
              >
                {(currentRequest?.main.temp - 273).toFixed(1)}&deg;
              </Typography>
            </Typography>
            <img
              src={`http://openweathermap.org/img/wn/${currentRequest?.weather[0].icon}@2x.png`}
              alt=""
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            disabled={props.disabled}
            variant="contained"
            onClick={() => addToStorage(currentRequest?.name)}
          >
            Add to list
          </Button>
        </CardActions>
      </Card>
    );
  }
};

export { WeatherCurrentCard };
