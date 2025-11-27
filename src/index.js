import { HashRouter, Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Chatbot />} />
      </Routes>
    </HashRouter>
  );
}

export default App;