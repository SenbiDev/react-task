import { useState } from "react";
import { Card, Form, Input, Button, Upload, Avatar, message } from "antd";
import { UploadOutlined, UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE, getAuthHeader } from "../axiosApi/apiConfig";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [ form ] = Form.useForm();
  const [ avatarUrl, setAvatarUrl ] = useState(user?.avatar || user?.avatar || null );
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async ({ file }) => {
    const formData = new formData();
    form.data.append("file", file);
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/upload/`, formData, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "multipart/form-data",
        },
      });

      const newUrl = res.data?.url || res.data?.path || res.data?.file;
      setAvatarUrl(newUrl);
      message.success("Foto Profile berhasil diunggah!");
    } catch (err) {
      console.error(err);
      message.error("Gagal menggungah foto!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const updateUser = {...values, avatarUrl} ;
      await axios.put(`${API_BASE}/user/profile/`, updateUser, {
        headers: getAuthHeader(),
      });
      localStorage.setItem("user",JSON.stringify(updateUser));
      message.success("Profile berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      message.error("Gagal memperbarui profile!");
    }
  };

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Card
      title="Profil saya"
      style={{
        width: 500,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0,1)",
      }}
      >
        <div style={{ textAlign : "center", marginBottom: 24 }}>
          <Avatar 
          size={100}
          src={avatarUrl}
          icon={<UserOutlined/>}
          style={{ marginBottom: 16 }}
          />
          <Upload
          customRequest={handleUpload}
          showUploadList={false}
          accept="image/*"
          >
            <Button
            icon={<UploadOutlined/>}
            loading={loading}
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: 6,
              marginBottom: 8,
            }}
            >
              Upload Foto
            </Button>
          </Upload>

          {/* Tombol kembali */}
          <div style={{ marginTop: 8 }}>
            <Button
            icon={<ArrowLeftOutlined/>}
            type="default"
            onClick={() => navigate("/artikel/")}
            style={{
              color: "#fff",
              backgroundColor: "#1677ff",
              borderRadius: 6,
            }}
            >
              Kembali
            </Button>
          </div>
        </div>
        <Form
        form={form}
        layout="vertical"
        initialValues={{
          user: user?.email || "",
          role: user?.role || "",
        }}
        onFinish={handleSubmit}
        >
          <Form.Item label="Username" name="username">
            <Input disabled/>
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input disabled/>
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