import React, {useEffect, useState} from "react";
import { useAuth } from "../auth/authContext";
import { Form, Input, Button, Upload, message, Avatar, Space, Card } from "antd";
import { UserOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import { ArrowLeftIcon } from "lucide-react";
import Column from "antd/es/table/Column";

export default function Profile () {
    const {user} = useAuth();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem("profile")) || {};
        if (storedProfile.avatar){
            setAvatarUrl(storedProfile.avatar);
        }
    },[]);

    const getBase = (file, callback) => {
        const reader = new FileReader();
        reader.onload = () => callback(reader.result);
        reader.readAsDataURL(file);
    };
    
    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;

            setAvatarUrl(base64);

            const storedProfile = JSON.parse(localStorage.getItem("profile"))||{};
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...storedProfile, avatar: url })
            );
        };
        reader.readAsDataURL(file.originFileObj||file);
        return false;
    };

    const onFinish = (values) => {
        const profileData = { ...values, avatar: avatarUrl};
        localStorage.setItem("profile", JSON.stringify(profileData));
        message.success("Data berhasil disimpan")
    };

    return(
        <div className="flex items-center justify-center min-h-screen">
            <Card title={
                    <div className="flex justify-between">
                        <span>
                            Profile
                        </span>
                        <Button
                            type="text"
                            icon={<ArrowLeftIcon/>}
                            onClick={() => navigate("/artikel")}
                            className="flex items-center text-gray-600"
                        >
                            Kembali
                        </Button>
                    </div>
            } className="w-full max-w-xl shadow-lg">
                <Form
                    form={form}
                    name="profile"
                    layout="vertical"
                    onFinish={onFinish}
                    style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                >
                    <Form.Item style={{flex: Column}}>
                        <Space direction="vertical" align="center">
                            <Avatar
                                size={200}
                                src={avatarUrl||null}
                                icon={!avatarUrl&&<UserOutlined/>}
                            />
                            <Upload
                                name="avatar"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleUpload}
                            >
                                <Button
                                    style={{marginTop: 8}}
                                    icon={<UploadOutlined/>}
                                    >
                                    {avatarUrl ? "Edit" : "Upload"}
                                </Button>
                            </Upload>
                            {avatarUrl && (
                                <Button
                                    icon={<EditOutlined/>}
                                    onClick={() => docoument.querySelector('input[type="file"]').click()}
                                >
                                    Edit
                                </Button>
                            )}
                        </Space>
                    </Form.Item>
                    <div className="flex gap-2">
                        <p className="text-black font-bold">
                            Username : 
                        </p>
                        <p>
                            {user?.username}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-black font-bold">
                            Email : 
                        </p>
                        <p>
                            {user?.email}
                        </p>
                    </div>
                </Form>
            </Card>
        </div>
    )
}