import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@ant-design/v5-patch-for-react-19"
import { unstableSetRender, ConfigProvider, theme } from "antd"
import { createRoot } from "react-dom/client"

import App from "./App"
import Home from "./pages/Home"
import About from "./pages/About"
import ArtikelApi from "./pages/ArtikelApi"
import Login from "./pages/Login"
import CreateArtikel from "./pages/CreateArtikel"
import KategoriTagsPage from "./pages/KategoriTagsPage"
import ProtectedRoute from "./components/ProtectedRoute"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "artikel-api",
        element: (
          <ProtectedRoute>
            <ArtikelApi />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-artikel",
        element: (
          <ProtectedRoute>
            <CreateArtikel />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-artikel/:id",   
        element: (
          <ProtectedRoute>
            <CreateArtikel />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/kategori-tags",
        element: (
          <ProtectedRoute>
            <KategoriTagsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

const queryClient = new QueryClient()

unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container)
  const root = container._reactRoot
  root.render(node)
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    root.unmount()
  }
})

function Root() {
  const [themeMode, setThemeMode] = React.useState(
    localStorage.getItem("theme") || "light"
  )

  React.useEffect(() => {
    const handler = (e) => setThemeMode(e.detail)
    window.addEventListener("theme-change", handler)
    return () => window.removeEventListener("theme-change", handler)
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)