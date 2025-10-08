import { useState } from "react";
import { Card, Form, Input, Button, Upload, Avatar, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE, getAuthHeader } from "../axiosApi/apiConfig";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/upload/`, formData, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "multipart/form-data",
        },
      });
      const newUrl = res.data.url;
      setAvatarUrl(newUrl);
      message.success("Foto profil berhasil diunggah!");
    } catch (err) {
      console.error(err);
      message.error("Gagal mengunggah foto!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const updatedUser = { ...values, avatar: avatarUrl };
      await axios.put(`${API_BASE}/user/profile/`, updatedUser, {
        headers: getAuthHeader(),
      });
      localStorage.setItem("user", JSON.stringify(updatedUser));
      message.success("Profil berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      message.error("Gagal memperbarui profil!");
    }
  };

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Card
        title="Profil Saya"
        style={{
          width: 500,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Avatar
            size={100}
            src={avatarUrl}
            icon={<UserOutlined />}
            style={{ marginBottom: 16 }}
          />
          <Upload
            customRequest={handleUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              Upload Foto
            </Button>
          </Upload>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            username: user?.username || "",
            email: user?.email || "",
            role: user?.role || "",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Username" name="username">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Simpan Perubahan
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
