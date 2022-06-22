import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchRefresh,
  refreshItem,
  removeItem,
} from "../store/weatherListSlice";

interface IProps {
  title: string;
  index: number;
  info: string;
  temp: string | number;
  img: string;
}

const WeatherCard: React.FC<IProps> = (props) => {
  const storage: any = localStorage.getItem("list");
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.weatherList);

  const removeRequest = (name: string) => {
    const store = JSON.parse(storage || "[]");
    const newStore = store.filter((item: string) => {
      return item !== name;
    });
    localStorage.setItem("list", JSON.stringify(newStore));
    dispatch(removeItem(name));
  };

  const refresh = (name: string) => {
    dispatch(fetchRefresh(name));
    setTimeout(() => {
      dispatch(refreshItem(props.index));
    }, 1000);
  };

  return (
    <Card sx={{ maxWidth: 345, width: "100%" }} variant="outlined">
      {status === "rejected" ? <Typography variant="h5">Error</Typography> : ""}
      <CardActions>
        <Button variant="outlined" onClick={() => refresh(props.title)}>
          Refresh
        </Button>
      </CardActions>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h5" component="div">
            {props.title}
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="h6"
              color="midnightblue"
            >
              {props.info}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="midnightblue"
            >
              {props.temp}&deg;
            </Typography>
          </Typography>
          <img
            style={{ marginLeft: "auto" }}
            src={`http://openweathermap.org/img/wn/${props.img}@2x.png`}
            alt=""
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" sx={{ textTransform: "none" }}>
          <NavLink className="card__item" to={`/weatherPage/${props.title}`}>
            More Info
          </NavLink>
        </Button>
        <Button
          onClick={() => removeRequest(props.title)}
          variant="contained"
          sx={{ textTransform: "none", bgcolor: "error.main" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export { WeatherCard };
