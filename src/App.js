import Home from "./Home";
import Scanner from "./screens/Scanner";
import Account from "./screens/Account";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import LotteryQR from "./screens/LotteryQR";
import { ConfigProvider, theme } from "antd";
import useScrollTo from "./hooks/useScrollTo";
import AuthPage from "./screens/Login/AuthPage";
import { UserListPage } from "./screens/Users/user_list";
import { setNavigate } from "./services/navigationService";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();
  useScrollTo();

  useEffect(() => {
    setNavigate(navigate);
    setIsAuthenticated(localStorage.getItem('is_logged_in') === 'true');
  }, [navigate]);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Header isAuthenticated={isAuthenticated} />
      <div className="text-white w-full min-h-screen overflow-clip flex bg-darkBlack justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" replace />} />
          <Route path="/scanner" element={isAuthenticated ? <Scanner /> : <Navigate to="/login" replace />} />
          <Route path="/users" element={isAuthenticated ? <UserListPage /> : <Navigate to="/login" replace />} />
          <Route path="/lotqr" element={isAuthenticated ? <LotteryQR /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
      <Footer />
    </ConfigProvider>
  );
};

export default App;