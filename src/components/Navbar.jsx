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
import { useEffect } from "react";
import api from "../axiosApi/apiConfig";

export default function Navbar() {
  const { user, logout, avatarUrl, setAvatarUrl, theme, setTheme } = useAuthStore();
  const navigate = useNavigate();

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
    const handleAvatarUpdate = (e) => setAvatarUrl(e.detail || null);
    window.addEventListener("avatar-updated", handleAvatarUpdate);
    return () => window.removeEventListener("avatar-updated", handleAvatarUpdate);
  }, [setAvatarUrl]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
  }, [theme]);

  const toggleTheme = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
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
      icon: <IdcardOutlined style={{ color: "var(--primary-color)" }} />,
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
        <span style={{ textTransform: "capitalize" }}>
          {user?.role === "admin" ? "Administrator" : "User"}
        </span>
      ),
      icon:
        user?.role === "admin" ? (
          <CrownOutlined style={{ color: "gold" }} />
        ) : (
          <UserOutlined style={{ color: "var(--primary-color)" }} />
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
    <nav
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        borderBottom: "1px solid var(--border-color)",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      className="flex justify-between items-center p-4"
    >
      <div className="flex space-x-4">
        {[
          { to: "/home", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/artikel-api", label: "Artikel API" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: "var(--text-color)",
              transition: "color 0.3s",
            }}
            className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Switch
          checked={theme === "dark"}
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
                  backgroundColor: avatarUrl ? "transparent" : "var(--hover-bg)",
                  color: "var(--text-color)",
                }}
              />
              <span
                style={{
                  color: "var(--text-color)",
                  transition: "color 0.3s",
                }}
                className="text-sm font-medium truncate max-w-[120px]"
              >
                {user?.username || "User"}
              </span>
            </div>
          </Dropdown>
        )}
      </div>
    </nav>
  );
}