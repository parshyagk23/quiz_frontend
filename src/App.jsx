import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import DashBoardPage from "./Pages/DashboardPage/DashBoardPage";
import ProtectedRoute from "./Components/ProtectRoute";
import QuizInterfacePage from "./Pages/QuizInterface/QuizInterfacePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<ProtectedRoute Component={DashBoardPage} />} />
        <Route path="/quiz/:id" element={<QuizInterfacePage/>} />
        
      </Routes>
    </>
  );
}

export default App;
