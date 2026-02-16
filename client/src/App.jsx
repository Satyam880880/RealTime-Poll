import './styles.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePoll from "./components/CreatePoll";
import PollRoom from "./components/PollRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/poll/:id" element={<PollRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
