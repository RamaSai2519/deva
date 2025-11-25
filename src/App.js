import Home from "./Home";
import { ConfigProvider, theme } from "antd";
import useScrollTo from "./hooks/useScrollTo";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  useScrollTo();

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Header />
      <img src="/Assets/images/logo.webp" alt="Logo" className="fixed top-2 left-10 w-32 h-24" />
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
      <Footer />
    </ConfigProvider>
  );
};

export default App;
