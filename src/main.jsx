import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import './index.css'
import Catatan from './pages/Catatan';
import CreateCatatan from './pages/CreateCatatan';
import UpdateCatatan from './pages/UpdateCatatan';

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
        path: "catatan",
        element: <Catatan />
      },
      {
        path: "createcatatan",
        element: <CreateCatatan />
      },
      {
        path: "updatecatatan",
        element: <UpdateCatatan />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)