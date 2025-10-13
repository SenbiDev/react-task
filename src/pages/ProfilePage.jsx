import { useState } from "react";
import { Card, Button, Upload, Avatar, message, Descriptions } from "antd";
import { UploadOutlined, UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE, getAuthHeader } from "../axiosApi/apiConfig";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async ({ file }) => {
    if (!user?.id) {
      message.error("User tidak ditemukan di localStorage!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);

      // PUT ke endpoint profile (sesuai backend guru)
      const res = await axios.put(`${API_BASE}/profiles/${user.id}/`, formData, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "multipart/form-data",
        },
      });

      // Ambil URL avatar dari response backend
      const rawUrl = res.data?.avatar || "";
      // Kalau path-nya relatif, ubah jadi URL lengkap
      const backendBase = API_BASE.replace("/api", "");
      const fullUrl = rawUrl.startsWith("http") ? rawUrl : `${backendBase}${rawUrl}`;

      // Set avatar di tampilan & simpan ke localStorage
      setAvatarUrl(fullUrl);
      const updatedUser = { ...user, avatar: fullUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      message.success("Foto profil berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      message.error("Gagal mengunggah foto profil!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Card
        title="Profil Saya"
        style={{
          width: 400,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <Avatar
            size={100}
            src={avatarUrl}
            icon={<UserOutlined />}
            style={{ marginBottom: 16 }}
          />
          <div>
            <Upload
              customRequest={handleUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button
                icon={<UploadOutlined />}
                loading={loading}
                style={{
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  borderRadius: 6,
                  marginBottom: 16,
                }}
              >
                Upload Foto
              </Button>
            </Upload>
          </div>
        </div>

        <Descriptions column={1} bordered size="small" style={{ marginBottom: 24 }}>
          <Descriptions.Item label="Username">{user?.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Role">
            {user?.role === "admin" ? "Admin" : "User"}
          </Descriptions.Item>
        </Descriptions>

        <Button
          icon={<ArrowLeftOutlined />}
          type="default"
          block
          onClick={() => navigate("/artikel")}
          style={{
            color: "#fff",
            backgroundColor: "#1677ff",
            borderRadius: 6,
          }}
        >
          Kembali
        </Button>
      </Card>
    </div>
  );
}
