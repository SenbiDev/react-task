import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
import { ArrowLeftOutlined, DeleteOutlined, LoadingOutlined, PlusOutlined, LinkOutlined } from "@ant-design/icons";
import { Card, Typography, Spin, message, Upload, Input, Button, Popconfirm } from "antd";
import api from "../axiosApi/apiConfig";
import { useAuthStore } from "../store/useAuthStore";

const { Title, Text } = Typography;
const BASE_URL = "http://127.0.0.1:8000"; 

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [website, setWebsite] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();
  const { user, setAvatarUrl } = useAuthStore(); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("profiles/");
        const data = Array.isArray(res.data)
          ? res.data.find((p) => p.user.id === user?.id)
          : res.data;

        setProfile(data);
        setWebsite(data?.website || "");

        if (data?.avatar) {
          const fullUrl = data.avatar.startsWith("http")
            ? data.avatar
            : `${BASE_URL}${data.avatar}`;
          setImageUrl(fullUrl);
          setAvatarUrl(fullUrl);
        } else {
          setImageUrl(null);
          setAvatarUrl(null);
        }
      } catch {
        message.error("Gagal memuat profil pengguna");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchProfile();
  }, [user?.id, setAvatarUrl]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("File harus berupa gambar!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ukuran gambar harus kurang dari 2MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleUpload = async ({ file }) => {
    if (!profile?.id) return message.error("Data profil belum siap.");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const res = await api.put(`profiles/${profile.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Foto profil berhasil diperbarui!");
      const data = res.data;

      const newUrl = data.avatar.startsWith("http")
        ? data.avatar
        : `${BASE_URL}${data.avatar}`;

      setImageUrl(newUrl);
      setAvatarUrl(newUrl); 
    } catch {
      message.error("Gagal memperbarui foto profil");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!profile?.id) return;
    try {
      setUploading(true);
      await api.put(`profiles/${profile.id}/`, { avatar: null });

      setImageUrl(null);
      setAvatarUrl(null); 
      message.success("Foto profil berhasil dihapus!");
    } catch {
      message.error("Gagal menghapus foto profil");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateWebsite = async () => {
    if (!profile?.id) return;
    try {
      await api.put(`profiles/${profile.id}/`, { website });
      message.success("Link sosial berhasil diperbarui!");
    } catch {
      message.error("Gagal memperbarui link sosial");
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
        loading={uploading}
      >
        <div className="relative inline-block">
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={handleUpload}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>

          {imageUrl && (
            <Popconfirm
              title="Hapus Foto Profil?"
              description="Foto profil akan dihapus secara permanen."
              okText="Ya, hapus"
              cancelText="Batal"
              onConfirm={handleDeleteAvatar}
            >
              <Button
                shape="circle"
                danger
                icon={<DeleteOutlined />}
                size="small"
                style={{
                  position: "absolute",
                  top: 5,
                  right: 10,
                  background: "rgba(255,255,255,0.9)",
                }}
              />
            </Popconfirm>
          )}
        </div>

        <Title level={4} style={{ marginTop: 10 }}>
          {user?.username}
        </Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 20 }}>
          {user?.role?.toUpperCase()}
        </Text>

        <Input
          prefix={<LinkOutlined />}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Tambahkan link sosial (contoh: https://instagram.com/...)"
          onPressEnter={handleUpdateWebsite}
          addonAfter={
            <Button type="link" onClick={handleUpdateWebsite}>
              Simpan
            </Button>
          }
        />

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-blue-500 hover:underline"
          >
            {website}
          </a>
        )}

        <br />
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/artikel-api")}>
          Kembali
        </Button>
      </Card>
    </div>
  );
}