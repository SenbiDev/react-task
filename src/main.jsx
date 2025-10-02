import React from 'react'
import ReactDOM from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import { unstableSetRender } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import './index.css'
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ArtikelPage from './pages/Artikel';
import CreateArtikel from './pages/CreateArtikel';
import AdminPage from './pages/AdminPage';
import ArtikelView from './pages/ArtikelView';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './auth/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
        element:(
          <PrivateRoute>
            <ArtikelPage/>
          </PrivateRoute>
        )
      },
      {
        path: "admin",
        element: <AdminPage />
      },
      {
        path: "create",
        element: <CreateArtikel />
      },
      {
        path: "artikel/:id",
        element: <ArtikelView />
      },
      {
        path: "*",
        element: <div>404 Not Found</div>
      }
    ]
  }
]);

const queryClient = new QueryClient();

unstableSetRender((node, container) => {
  container._reactRoot ||= ReactDOM.createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)