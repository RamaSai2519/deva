import React from "react";
import Home from "./Home";
import Header from "./components/Header";
import { ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Header />
      <div className="text-white min-w-full min-h-screen overflow-clip bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
};

export default App;