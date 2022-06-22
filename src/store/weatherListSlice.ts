import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IWeatherRequest {
  name: string;
  weather: [
    {
      icon: string;
      main: string;
    }
  ];
  sys: {
    country: string;
    sunset: number;
    sunrise: number;
  };
  wind: {
    gust: number;
    speed: number;
  };
  main: {
    feels_like: number;
    temp: number;
  };
}

interface WeatherSlice {
  currentRequest: IWeatherRequest;
  list: IWeatherRequest[];
  status: string;
  currentStatus: string;
}

const initialState: WeatherSlice = {
  currentRequest: {
    name: "Find city",
    weather: [
      {
        icon: "",
        main: "",
      },
    ],
    main: {
      feels_like: 273,
      temp: 273,
    },
    wind: {
      speed: 0,
      gust: 0,
    },
    sys: {
      country: "UA",
      sunset: 0,
      sunrise: 0,
    },
  },
  list: [],
  currentStatus: "pending",
  status: "pending",
};

export const fetchCurrentCity = createAsyncThunk(
  "weather/fetchCurrentCity",
  async (getName: string) => {
    try {
      const responsive = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${getName}&appid=18a893d2564c6fb5e727e32444e879fe`
      );
      const data = await responsive.json();
      if (responsive.status === 404) {
        initialState.status = "rejected";
      } else {
        return data;
      }
    } catch {}
  }
);

export const fetchToList = createAsyncThunk(
  "weather/fetchToList",
  async (getName: string) => {
    try {
      const responsive = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${getName}&appid=18a893d2564c6fb5e727e32444e879fe`
      );
      const data = await responsive.json();
      if (!responsive.ok) {
        initialState.status = "rejected";
      } else {
        return data;
      }
    } catch {}
  }
);

export const weatherListSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addToList(state) {
      state.list.forEach((item) => {
        if (item.name === state.currentRequest.name) {
          state.list = state.list.filter(
            (item) => item.name !== state.currentRequest.name
          );
        }
      });
      state.list = state.list.concat(state.currentRequest);
    },
    removeItem(state, action) {
      state.list = state.list.filter((item) => item.name !== action.payload);
    },
    rebootList(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCity.fulfilled, (state, action) => {
      state.currentStatus = "pending";
      if (!action.payload) {
        state.currentStatus = "rejected";
      } else {
        state.currentStatus = "fulfilled";
        state.currentRequest = action.payload;
      }
    });
    builder.addCase(fetchToList.fulfilled, (state, action) => {
      if (!action.payload) {
        state.status = 'rejected'
      } else {
        state.status = "fulfilled";
        state.list.forEach((item) => {
          if (item.name === action.payload.name) {
            state.list = state.list.filter(
              (item) => item.name !== action.payload.name
            );
          }
        });
        state.list = state.list.concat(action.payload);
      }
    });
  },
});

export const { removeItem, rebootList, addToList } = weatherListSlice.actions;

export default weatherListSlice.reducer;
