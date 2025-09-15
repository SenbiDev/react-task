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
    element: <Login />,
  },
  {
    path: "/app",
    element: <App />, 
    children: [
      { index: true, 
        element: 
        <ProtectedRoute>
          <Home /> 
        </ProtectedRoute>
      },
      { path: "about", 
        element: 
        <ProtectedRoute>
          <About /> 
        </ProtectedRoute>
      },
      {
        path: "artikel-api",
        element: (
          <ProtectedRoute>
            <ArtikelApi /> 
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);