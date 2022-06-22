/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchToList,
  IWeatherRequest,
  rebootList,
} from "../store/weatherListSlice";

const WeatherSingleCard: React.FC<{}> = () => {
  const { city } = useParams();
  const storage = localStorage.getItem("list") || "[]";
  const getStorage: string[] = JSON.parse(storage);
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.weatherList);
  const currentPage: IWeatherRequest = list.filter(
    (item) => item.name === city
  )[0];

  const cutTime = (time: Date) => {
    return time.toString().slice(16, 25);
  };

  useEffect(() => {
    dispatch(rebootList());
    getStorage.forEach((item) => {
      dispatch(fetchToList(item));
    });
  }, [dispatch]);
  return (
    <Container>
      <Card
        sx={{ maxWidth: "100%", width: "fit-content", mb: 5 }}
        variant="outlined"
      >
        <Box sx={{ display: "flex" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "start" }}>
              <Typography gutterBottom variant="h4" component="div">
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ display: "block" }}
                >
                  Country: {currentPage?.sys.country}
                </Typography>
                {currentPage?.name}
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ display: "block" }}
                >
                  {currentPage?.weather[0].main}
                </Typography>
              </Typography>
              <img
                src={`http://openweathermap.org/img/wn/${
                  currentPage?.weather[0].icon || "01n"
                }@2x.png`}
                alt=""
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h5" color="black" sx={{ mr: 3 }}>
                Sunrise
                <Typography variant="body2">
                  {cutTime(new Date(currentPage?.sys.sunrise))}
                </Typography>
              </Typography>
              <Typography variant="h5" color="black">
                Sunset
                <Typography variant="body2">
                  {cutTime(new Date(currentPage?.sys.sunset))}
                </Typography>
              </Typography>
            </Box>
          </CardContent>
          <CardContent>
            Wind:
            <Typography variant="h5">
              &nbsp; Gust: {currentPage?.wind.gust || "0"} m/s
            </Typography>
            <Typography variant="h5">
              &nbsp; Speed: {currentPage?.wind.speed} m/s
            </Typography>
          </CardContent>
          <CardContent>
            Temperature:
            <Typography variant="h6" component="span" sx={{ display: "block" }}>
              &nbsp; Temperature: {(currentPage?.main.temp - 273).toFixed(1)}
              &deg;
            </Typography>
            <Typography variant="h6" component="span" sx={{ display: "block" }}>
              &nbsp; Feels like:{" "}
              {(currentPage?.main.feels_like - 273).toFixed(1)}
              &deg;
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export { WeatherSingleCard };
