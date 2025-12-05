import Home from "./Home";
import { useEffect } from "react";
import Scanner from "./screens/Scanner";
import Account from "./screens/Account";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ConfigProvider, theme } from "antd";
import useScrollTo from "./hooks/useScrollTo";
import AuthPage from "./screens/Login/AuthPage";
import { useAuth } from "./contexts/AuthContext";
import { UserListPage } from "./screens/Users/user_list";
import { setNavigate } from "./services/navigationService";
import { Route, Routes, useNavigate } from "react-router-dom";


const App = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useScrollTo();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Header />
      <div className="text-white w-full min-h-screen overflow-clip flex bg-darkBlack justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          {isAuthenticated && (
            <>
              <Route path="/account" element={<Account />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/users" element={<UserListPage />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </ConfigProvider>
  );
};

export default App;