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
import { useEffect, useState } from "react";
import api from "../axiosApi/apiConfig";

export default function Navbar() {
  const { user, logout, avatarUrl, setAvatarUrl } = useAuthStore();
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const fetchProfileAvatar = async () => {
      if (!user?.id) return;
      try {
        const res = await api.get("profiles/");
        const profile = Array.isArray(res.data)
          ? res.data.find((p) => p.user.id === user.id)
          : res.data;

        if (profile?.avatar) {
          const fullUrl = profile.avatar.startsWith("http")
            ? profile.avatar
            : `http://127.0.0.1:8000${profile.avatar}`;
          setAvatarUrl(fullUrl);
        } else {
          setAvatarUrl(null);
        }
      } catch (err) {
        console.warn("Gagal memuat foto profil navbar:", err);
      }
    };

    fetchProfileAvatar();
  }, [user?.id, setAvatarUrl]);

  useEffect(() => {
    const handleAvatarUpdate = (e) => {
      setAvatarUrl(e.detail || null);
    };
    window.addEventListener("avatar-updated", handleAvatarUpdate);
    return () => window.removeEventListener("avatar-updated", handleAvatarUpdate);
  }, [setAvatarUrl]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("theme-change", { detail: themeMode }));
  }, [themeMode]);

  const toggleTheme = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = [
    {
      key: "profile",
      label: "Profil Saya",
      icon: <IdcardOutlined style={{ color: "#1677ff" }} />,
      onClick: () => navigate("/profiles"),
    },
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
        {[
          { to: "/home", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/artikel-api", label: "Artikel API" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Switch
          checked={themeMode === "dark"}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />

        {user && (
          <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <Avatar
                src={avatarUrl}
                icon={!avatarUrl && <UserOutlined />}
                style={{
                  backgroundColor: avatarUrl ? "transparent" : "#f0f0f0",
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