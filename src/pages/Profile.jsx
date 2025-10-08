import { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Spin,
  message,
  Upload,
  Input,
} from "antd";
import { UserOutlined, UploadOutlined, LinkOutlined } from "@ant-design/icons";
import api from "../axiosApi/apiConfig";

const { Title, Text } = Typography;

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [website, setWebsite] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("profiles/");
        const data = Array.isArray(res.data)
          ? res.data.find((p) => p.user.id === user.id)
          : res.data;
        setProfile(data);
        setWebsite(data?.website || "");
      } catch (err) {
        message.error("Gagal memuat profil pengguna");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.id]);

  const handleUpload = async ({ file }) => {
    if (!profile?.id) return message.error("Data profil belum siap.");

    const formData = new FormData();
    formData.append("avatar", file); 

    try {
      setUpdating(true);
      await api.patch(`profiles/${profile.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Foto profil berhasil diperbarui!");

      const res = await api.get("profiles/");
      const data = Array.isArray(res.data)
        ? res.data.find((p) => p.user.id === user.id)
        : res.data;
      setProfile(data);
    } catch (err) {
      message.error("Gagal memperbarui foto profil");
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateWebsite = async () => {
    if (!profile?.id) return;
    try {
      setUpdating(true);
      await api.patch(`profiles/${profile.id}/`, { website });
      message.success("Link sosial berhasil diperbarui!");
    } catch (err) {
      message.error("Gagal memperbarui link sosial");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spin tip="Memuat profil..." />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center mt-20">
        <Text>Tidak ada data profil ditemukan.</Text>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <Card
        style={{
          width: 400,
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
        loading={updating}
      >
        <Avatar
          size={100}
          src={profile.avatar}
          icon={<UserOutlined />}
          style={{ marginBottom: 16 }}
        />
        <div style={{ marginBottom: 20 }}>
          <Upload
            showUploadList={false}
            customRequest={handleUpload}
            accept="image/*"
          >
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
              <UploadOutlined /> Ganti Foto
            </button>
          </Upload>
        </div>

        <Title level={4}>{user?.username}</Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 10 }}>
          {user?.role?.toUpperCase()}
        </Text>

        <Input
          prefix={<LinkOutlined />}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Masukkan link sosial (contoh: https://instagram.com/...)"
          onBlur={handleUpdateWebsite}
        />

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-500 hover:underline"
          >
            {website}
          </a>
        )}
      </Card>
    </div>
  );
}