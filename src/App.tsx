import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchMovies } from "./components/SearchMovies";
import { Header } from "./components";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchMovies />
    </div>
  );
}

export default App;
