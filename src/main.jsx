import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import ArtikelPage from "./pages/ArtikelPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminPage from "./pages/AdminPage";
import CreateArtikel from "./pages/CreateArtikel";
import "./index.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "artikel",
        element: <ArtikelPage />
      },
      {
        path: "admin",
        element: <AdminPage />
      },
      {
        path: "artikel/create",
        element: <CreateArtikel />
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
