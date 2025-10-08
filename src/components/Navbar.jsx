import { Avatar, Dropdown, Switch } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MailOutlined,
  CrownOutlined,
  EditOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("theme-change", { detail: themeMode }));
  }, [themeMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleTheme = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const items = [
    {
      key: "email",
      label: <span>{user?.email}</span>,
      icon: <MailOutlined />,
      disabled: true,
    },
    {
      key: "role",
      label: (
        <span className="capitalize">
          {user?.role === "admin" ? "Administrator" : "User"}
        </span>
      ),
      icon:
        user?.role === "admin" ? (
          <CrownOutlined style={{ color: "gold" }} />
        ) : (
          <UserOutlined style={{ color: "#1677ff" }} />
        ),
      disabled: true,
    },

    {
      key: "profile",
      label: "Profil Saya",
      icon: <IdcardOutlined style={{ color: "#1677ff" }} />,
      onClick: () => navigate("/profiles"),
    },

    ...(user?.role === "admin"
      ? [
          {
            key: "manage",
            label: "Kelola Kategori & Tag",
            icon: <EditOutlined style={{ color: "green" }} />,
            onClick: () => navigate("/admin/kategori-tags"),
          },
        ]
      : []),

    { type: "divider" },
    {
      key: "logout",
      label: <span style={{ color: "red" }}>Logout</span>,
      icon: <LogoutOutlined style={{ color: "red" }} />,
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="flex justify-between bg-gray-800 p-4 items-center">
      <div className="flex space-x-4">
        <Link
          to="/home"
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
          to="/artikel-api"
          className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
        >
          Artikel API
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Switch
          checked={themeMode === "dark"}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />

        {user && (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            overlayClassName="min-w-[220px]"
          >
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <Avatar
                src={user?.avatar}
                icon={!user?.avatar && <UserOutlined />}
                style={{
                  backgroundColor: user?.avatar ? "transparent" : "#f0f0f0",
                  color: "#333",
                }}
              />
              <span className="text-white text-sm font-medium truncate max-w-[120px]">
                {user?.username || "User"}
              </span>
            </div>
          </Dropdown>
        )}
      </div>
    </nav>
  );
}