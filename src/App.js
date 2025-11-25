import { ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useScrollTo from "./hooks/useScrollTo";
import AuthPage from "./screens/Login/AuthPage";
import AccountPage from "./screens/Login/ProfilePage";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  useScrollTo();

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Header />
      <div className="text-white min-w-full min-h-screen overflow-clip bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          {isAuthenticated && (
            <Route path="/account" element={<AccountPage />} />
          )}
          {isAuthenticated && isAdmin && (
            <Route path="/" element={<div>Admin Page</div>} />
          )}
        </Routes>
      </div>
      <Footer />
    </ConfigProvider>
  );
};

export default App;