import React, {useEffect, useState} from "react";
import { useAuth } from "../auth/authContext";
import { Form, Input, Button, Upload, message, Avatar, Space, Card } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";

export default function Profile () {
    const {user} = useAuth();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem("profile")) || {};
        if (storedProfile.avatar) setAvatarUrl(storedProfile.avatar);
        form.setFieldsValue({
            name: storedProfile.name || "",
            email: storedProfile.email || "",
        });
    }, []);
    
    const handleUpload = (info) => {
        if(info.file.status === "done" || info.file.status === "uploading"){
            const url = URL.createObjectURL(info.file.originFileObj);
            setAvatarUrl(url);
        }
    };

    const onFinish = (values) => {
        const profileData = { ...values, avatar: avatarUrl};
        localStorage.setItem("profile", JSON.stringify(profileData));
        message.success("Data berhasil disimpan")
    };

    return(
            <Card>
                <Form
                    form={form}
                    name="profile"
                    layout="vertical"
                    onFinish={onFinish}
                    style={{maxWidth: 400, margin: "0 auto"}}
                >
                    <Form.Item style={{flex: Column}}>
                        <Upload
                            name="avatar"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleUpload}
                    >
                        {avatarUrl ? (
                            <Avatar size={100} src={avatarUrl}/>
                        ) : (
                            <Avatar size={100} icon={<UserOutlined/>}/>
                        )}
                        <Button
                            style={{marginTop: 8}}
                            icon={<UploadOutlined/>}
                        >
                            Upload
                        </Button>
                    </Upload>
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
    )
}