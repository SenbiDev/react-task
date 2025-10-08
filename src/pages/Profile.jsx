import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Spin,
  message,
  Upload,
  Input,
  Button,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import api from "../axiosApi/apiConfig";

const { Title, Text } = Typography;

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [website, setWebsite] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

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
        setImageUrl(data?.avatar ? data.avatar : null);
      } catch {
        message.error("Gagal memuat profil pengguna");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.id]);

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
      await api.patch(`profiles/${profile.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Foto profil berhasil diperbarui!");

      const res = await api.get("profiles/");
      const data = Array.isArray(res.data)
        ? res.data.find((p) => p.user.id === user.id)
        : res.data;
      setProfile(data);
      setImageUrl(data.avatar);
    } catch {
      message.error("Gagal memperbarui foto profil");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateWebsite = async () => {
    if (!profile?.id) return;
    try {
      await api.patch(`profiles/${profile.id}/`, { website });
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
              style={{ width: "100%", borderRadius: "50%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>

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
      </Card>
    </div>
  );
}