import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import './index.css'
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ArtikelPage from './pages/Artikel';
import AdminPage from './pages/AdminPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
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
        path: "*",
        element: <div>404 Not Found</div>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)