import React from "react";
import { ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./screens/Login/LoginPage";
import SignupPage from "./screens/Login/SignupPage";
import AccountPage from "./screens/Login/ProfilePage";
import useScrollTo from "./hooks/useScrollTo";

const App = () => {
  useScrollTo();

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Header />
      <div className="text-white min-w-full min-h-screen overflow-clip bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
      <Footer />
    </ConfigProvider>
  );
};

export default App;