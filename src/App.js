import React from "react";
import Home from "./Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ConfigProvider, theme } from "antd";
import useScrollTo from "./hooks/useScrollTo";
import { Route, Routes } from "react-router-dom";

const App = () => {
  useScrollTo();

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Header />
      <div className="text-white min-w-full min-h-screen overflow-clip bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </ConfigProvider>
  );
};

export default App;
