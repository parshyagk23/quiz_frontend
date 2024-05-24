import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import DashBoardPage from "./Pages/DashboardPage/DashBoardPage";
import ProtectedRoute from "./Components/ProtectRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<ProtectedRoute Component={DashBoardPage} />} />
        
      </Routes>
    </>
  );
}

export default App;
