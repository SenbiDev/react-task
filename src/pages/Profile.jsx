import React from "react";
import {
    Card,
    Upload,
    Button,
    Popconfirm,
    message,
} from "antd";
import {
    DeleteOutlined,
    UserOutlined,
    ArrowLeftOutlined,
    ArrowUpOutlined
} from "@ant-design/icons";
import { useProfileStore } from "../store/useProfileStore";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "lucide-react";

export default function Profile() {
    const {
        avatarUrl,
        setAvatarUrl,
        clearProfile,
    } = useProfileStore();
    const navigate = useNavigate();

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
        message.error("File harus berupa gambar!");
        return Upload.LIST_IGNORE;
        }
        return true;
    };

    const handleUpload = ({ file }) => {
        const reader = new FileReader();
        reader.onload = (e) => {
        setAvatarUrl(e.target.result);

        const profile = JSON.parse(localStorage.getItem("profile"))||{};
        profile.avatar = e.target.result;
        localStorage.setItem("profile", JSON.stringify(profile));

        message.success("Foto profil berhasil diperbarui!");
        };
        reader.readAsDataURL(file);
    };

return (
    <div className="flex justify-center mt-10">
        <Card  title={
                    <div className="flex justify-between">
                        <span>
                            Profile
                        </span>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined/>}
                            onClick={() => navigate("/artikel")}
                            className="flex items-center text-gray-600"
                        >
                            Kembali
                        </Button>
                    </div>
                }>    
            <Card
                style={{
                width: 400,
                textAlign: "center",
                backgroundColor: "var(--card-bg)",
                color: "var(--text-color)",
                border: "1px solid var(--border-color)",
                }}
            >
                <div className="flex flex-col ">
                {avatarUrl ? (
                    <img
                    src={avatarUrl}
                    alt="avatar"
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto",
                    }}
                    />
                ) : (
                    <div
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "#ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                    }}
                    >
                    <UserOutlined style={{ fontSize: 32, color: "#888" }} />
                    </div>
                )}

                {avatarUrl && (
                    <Upload
                    name="avatar"
                    showUploadList={false}
                    customRequest={handleUpload}
                    beforeUpload={beforeUpload}
                    >
                    <Button
                        type="text"
                        icon={<EditIcon style={{ fontSize: 26 }} />}
                        style={{
                        fontSize: "50",
                        position: "absolute",
                        top: 30,
                        right: 140,
                        textDecoration: "none",
                        }}
                    />
                    </Upload>
                )}
                </div>
                <div className="flex flex-col items-center">
                    {!avatarUrl && (
                        <Upload
                        name="avatar"
                        showUploadList={false}
                        customRequest={handleUpload}
                        beforeUpload={beforeUpload}
                        >
                        <Button
                            icon={<ArrowUpOutlined />}
                            style={{ marginTop: 10 }}
                        >
                            Upload
                        </Button>
                        </Upload>
                    )}
                    {avatarUrl && (
                    <Button
                    danger
                    style={{ marginTop: 10, width: "fit-content", display: "flex"}}
                    icon={<DeleteOutlined/>}
                    onClick={() => {
                        clearProfile();
                        localStorage.removeItem("profile")
                        message.success("Profile dihapus!");
                    }}
                    >
                    Hapus
                    </Button>
                    )}
                </div>
            </Card>
        </Card>
    </div>
    );
}