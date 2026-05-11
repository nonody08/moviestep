import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      <Header page={page} setPage={setPage} />
      {page === "home" ? <Home /> : <About />}
    </div>
  );
}

export default App;