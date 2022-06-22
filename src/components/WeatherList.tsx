/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, AlertTitle, Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchToList,
  IWeatherRequest,
  rebootList,
} from "../store/weatherListSlice";
import { WeatherCard } from "./WeatherCard";

const WeatherList: React.FC<{}> = () => {
  let { list, status } = useAppSelector((state) => state.weatherList);
  const storage = localStorage.getItem("list") || "[]";
  const getStorage: string[] = JSON.parse(storage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rebootList())
    getStorage.forEach((item) => {
      dispatch(fetchToList(item));
    });
  }, [dispatch]);
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {status === "rejected" ? (
        <Alert severity="error" sx={{mx: 'auto'}}>
          <AlertTitle>Error</AlertTitle>
          Check your — <strong>internet connection!</strong>
        </Alert>
      ) : (
        list?.map((item: IWeatherRequest, index: number) => (
          <Grid item xs={3} key={index}>
            <WeatherCard
              title={item?.name}
              index={index}
              info={item?.weather[0].main}
              temp={(item?.main.temp - 273).toFixed(1)}
              img={item?.weather[0].icon}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export { WeatherList };
