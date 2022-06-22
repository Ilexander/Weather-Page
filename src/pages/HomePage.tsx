import { Container } from "@mui/material";
import { useState } from "react";
import "../App.css";
import { WeatherCurrentCard } from "../components/WeatherCurrentCard";
import { WeatherList } from "../components/WeatherList";
import { WeatherNav } from "../components/WeatherNav";

const HomePage: React.FC<{}> = () => {
  const storage: any = localStorage.getItem("list");
  const [disabled, setDisabled] = useState(true);

  return (
    <header className="App-header">
      <WeatherNav setDisabled={setDisabled} />
      <Container>
        <WeatherCurrentCard
          disabled={disabled}
          storage={storage}
          setDisabled={setDisabled}
        />
        <WeatherList />
      </Container>
    </header>
  );
};

export { HomePage };
