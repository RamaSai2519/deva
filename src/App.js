import { ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Scanner from "./screens/Scanner";
import Footer from "./components/Footer";
import Account from "./screens/Account";
import useScrollTo from "./hooks/useScrollTo";
import AuthPage from "./screens/Login/AuthPage";
import { UserListPage } from "./screens/Users/user_list";
import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";


const App = () => {
  const { isAuthenticated } = useAuth();
  useScrollTo();

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