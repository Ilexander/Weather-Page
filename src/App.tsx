import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Test } from "./pages/SinglePage";
import { HomePage } from "./pages/HomePage";
import { useLayoutEffect } from "react";

function App() {
  useLayoutEffect(() => {
    localStorage.getItem("list") || localStorage.setItem("list", "[]");
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/weatherPage/:city" element={<Test />}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
