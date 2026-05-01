import { Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/projects" element={<PortfolioPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<PortfolioPage />} />
    </Routes>
  );
}

export default App;
