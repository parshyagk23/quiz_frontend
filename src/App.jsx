import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import DashBoardPage from "./Pages/DashboardPage/DashBoardPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
      </Routes>
    </>
  );
}

export default App;
