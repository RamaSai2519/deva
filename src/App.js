import Home from "./Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Suspense, lazy, useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import useScrollTo from "./hooks/useScrollTo";
import { setNavigate } from "./services/navigationService";
import { requestNotificationPermission } from "./utils/firebase";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const AuthPage = lazy(() => import("./screens/Login/AuthPage"));
const Stalls = lazy(() => import("./screens/Stalls"));
const Scanner = lazy(() => import("./screens/Scanner"));
const Account = lazy(() => import("./screens/Account"));
const LotteryQR = lazy(() => import("./screens/LotteryQR"));
const Notify = lazy(() => import("./screens/Notify"));
const UserListPage = lazy(() =>
  import("./screens/Users/user_list").then((module) => ({ default: module.UserListPage }))
);

const protectedRoutes = [
  { path: "/stalls", component: Stalls },
  { path: "/account", component: Account },
  { path: "/scanner", component: Scanner },
  { path: "/lotqr", component: LotteryQR },
  { path: "/users", component: UserListPage },
  { path: "/notify", component: Notify }
];

const App = () => {
  const version = '1.5.7';
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();
  useScrollTo();

  if (localStorage.getItem('version') !== version) { localStorage.clear(); localStorage.setItem('version', version); }

  useEffect(() => {
    setNavigate(navigate);
    setIsAuthenticated(localStorage.getItem('is_logged_in') === 'true');
  }, [navigate, version]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (localStorage.getItem('notif_permission_prompted') === 'true') return;

    const handleFirstUserGesture = () => {
      localStorage.setItem('notif_permission_prompted', 'true');
      requestNotificationPermission().catch(() => { });
    };

    window.addEventListener('pointerdown', handleFirstUserGesture, { once: true, passive: true });
    return () => window.removeEventListener('pointerdown', handleFirstUserGesture);
  }, [isAuthenticated]);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Header isAuthenticated={isAuthenticated} />
      <main className="text-white w-full min-h-screen overflow-clip flex bg-darkBlack justify-center items-center">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
            {protectedRoutes.map(({ path, component: Component }) => (
              <Route
                key={path} path={path}
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Component />
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </ConfigProvider>
  );
};

export default App;