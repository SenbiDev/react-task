import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  Avatar,
  Dropdown,
  Switch,
  ConfigProvider,
  theme as antdTheme,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MailOutlined,
  CrownOutlined,
  EditOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, setDarkMode } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const items = [
    {
      key: "email",
      label: <span>{user?.email}</span>,
      icon: <MailOutlined />,
    },
    {
      key: "role",
      label: (
        <span className="capitalize">
          {user?.role === "admin" ? "admin" : "user"}
        </span>
      ),
      icon:
        user?.role === "admin" ? (
          <CrownOutlined style={{ color: "gold" }} />
        ) : (
          <UserOutlined style={{ color: "blue" }} />
        ),
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined style={{ color: "green" }} />,
      onClick: () => navigate("/profile"),
    },
    ...(user?.role === "admin"
      ? [
          {
            key: "manage",
            label: "Kelola Kategori dan Tag",
            icon: <EditOutlined style={{ color: "blue" }} />,
            onClick: () => navigate("/admin/"),
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <span style={{ color: "red", fontWeight: "bold" }}>Logout</span>,
      icon: <LogoutOutlined style={{ color: "red" }} />,
      onClick: handleLogout,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <nav
        className={`p-4 flex justify-between transition-all duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-800"
        }`}
      >
        <div className="container mx-auto flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            About
          </Link>
          <Link
            to="/artikel"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            Artikel
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <BuildOutlined className="mr-2 text-yellow-400" />
            <Switch
              checked={isDarkMode}
              onChange={setDarkMode}
              checkedChildren="🌙"
              unCheckedChildren="🌞"
            />
          </div>

          {user && (
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="min-w-[200px]"
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  src={user?.avatar}
                  icon={!user?.avatar && <UserOutlined />}
                  style={{ backgroundColor: "#f0f0f0", color: "white" }}
                />
                <span className="text-white text-sm font-medium truncate max-w-[100px]">
                  {user.username}
                </span>
              </div>
            </Dropdown>
          )}
        </div>
      </nav>
    </ConfigProvider>
  );
}