import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import DashBoardPage from "./Pages/DashboardPage/DashBoardPage";
import ProtectedRoute from "./Components/ProtectRoute";
import QuizInterfacePage from "./Pages/QuizInterface/QuizInterfacePage";
import PageNotFond from "./Pages/PageNotFound";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<ProtectedRoute Component={DashBoardPage} />} />
        <Route path="/quiz/:id" element={<QuizInterfacePage/>} />
        <Route path="*" element={<PageNotFond/>} />
        
      </Routes>
    </>
  );
}

export default App;
