import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme, App as AntdApp } from "antd";
import { useAuthStore } from "./store/useAuthStore";

import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import ArtikelApi from "./pages/ArtikelApi";
import Login from "./pages/Login";
import CreateArtikel from "./pages/CreateArtikel";
import KategoriTagsPage from "./pages/KategoriTagsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

import "./index.css";
import "antd/dist/reset.css";

const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "about", element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: "artikel-api", element: <ProtectedRoute><ArtikelApi /></ProtectedRoute> },
      { path: "create-artikel", element: <ProtectedRoute><CreateArtikel /></ProtectedRoute> },
      { path: "create-artikel/:id", element: <ProtectedRoute><CreateArtikel /></ProtectedRoute> },
      { path: "admin/kategori-tags", element: <ProtectedRoute><KategoriTagsPage /></ProtectedRoute> },
      { path: "profiles", element: <ProtectedRoute><Profile /></ProtectedRoute> },
    ],
  },
]);

const queryClient = new QueryClient();

function Root() {
  const { theme: themeMode } = useAuthStore();

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: themeMode === "dark" ? "#177ddc" : "#1677ff",
          colorBgBase: themeMode === "dark" ? "#141414" : "#ffffff",
          colorTextBase: themeMode === "dark" ? "#f5f5f5" : "#141414",
          colorBorder: themeMode === "dark" ? "#303030" : "#d9d9d9",
          borderRadius: 8,
        },
      }}
    >
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);