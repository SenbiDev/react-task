import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import ArtikelApi from "./pages/ArtikelApi";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App selalu render Navbar + Outlet
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "artikel-api",
        element: (
          <ProtectedRoute>
            <ArtikelApi /> {/* ArtikelApi tetap lewat App, jadi Navbar tampil */}
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login", // login dipisahkan 
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);