import React, { useState } from "react";
import Home from "./Home";
import Header from "./components/Header";
import { ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('access_token') ? true : false);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="text-white min-w-full min-h-screen overflow-clip bg-black">
        <Header />
        <Routes>
          {isAuth ? (
            <>
              <Route path="/admin" element={<div>Hello Admin</div>} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<div>Login</div>} />
            </>
          )}
        </Routes>
      </div>
    </ConfigProvider>
  );
};

export default App;