import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";

function Main() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </HashRouter>
  );
}

export default Main;
