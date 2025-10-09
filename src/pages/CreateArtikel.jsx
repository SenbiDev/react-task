import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useArtikelStore } from "../store/useArtikelStore";
import * as admin from "../hooks/admin";
import { Card, Button, Form, Input, Space, Select, Checkbox, Radio, message } from "antd";
import * as artikel from "../hooks/artikel";
import { ArrowLeftIcon } from "lucide-react";


export default function CreateArtikel () {
    const navigate = useNavigate();
    const setJudul = useArtikelStore((state) => state.setJudul)
    const setKonten = useArtikelStore((state) => state.setKonten)
    const setKategori = useArtikelStore((state) => state.setKategori)
    const setTags = useArtikelStore((state) => state.setTags)
    const setStatus = useArtikelStore((state) => state.setStatus)
    const createArt = useArtikelStore((state) => state.createArt)
    const updateArt = useArtikelStore((state) => state.updateArt)
    const artikelData = useArtikelStore((state) => state.editingArtikel)
    const clearEditingArtikel = useArtikelStore((state) => state.clearEditingArtikel)

    const createArtikel = artikel.useCreateArtikel();
    const updateArtikel = artikel.useUpdateArtikel();
    

    const { data: kategoriList = [], isLoading: kategoriLoading } = admin.useKategori();
    const { data: tagList = [], isLoading: tagLoading } = admin.useTags();

    const [form] = Form.useForm();
    
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (artikelData) {
            form.setFieldsValue({
                judul: artikelData?.judul || "",
                konten: artikelData?.konten || "",
                kategori: artikelData?.kategori?.id || "",
                tags: artikelData?.tags?.map(t => t.id) || [],
                status: artikelData?.status || "draft",
            })
        } else {
            form.resetFields();
        }
    }, [artikelData, form]);


    const SubmitButton = ({ form, children }) => {
        const [submittable, setSubmittable] = React.useState(false);
        const values = Form.useWatch([], form);
        React.useEffect(() => {
            form
                .validateFields({ validateOnly: true })
                .then(() => setSubmittable(true))
                .catch(() => setSubmittable(false));
    }, [form, values]);
        return (
            <Button type="primary" htmlType="submit" disabled={!submittable}>
                {children}
            </Button>
        );
    };

    const handleFinish = async (values) => {
        try {
            setJudul(values.judul);
            setKonten(values.konten);
            setKategori(values.kategori);
            setTags(values.tags);
            setStatus(values.status);
            
            const payload = {
                judul: values.judul,
                konten: values.konten,
                kategori_id: values.kategori,
                tag_ids: Array.isArray(values.tags) ? values.tags: [],
                status: values.status || "draft",
            };
    
            console.log("Payload dikirim ke API", payload, "editingId:", artikelData?.id);

            if (artikelData?.id) {
                await updateArtikel.mutateAsync({id: artikelData.id, payload});
                infoUpdate();
            } else {
                await createArtikel.mutateAsync(payload);
                infoCreate();
            }
            
            form.resetFields();
            setTimeout(() => {
                navigate("/artikel");
            }, 2000);
        } catch (err) {
            console.error("Gagal membuat artikel", err.response?.data || err.message);
            messageApi.error("Gagal membuat artikel");
        }
    };

    const handleCancel = () => {
        form.resetFields();
        clearEditingArtikel();
        navigate("/artikel");
    }

    const handleBack = () => {
        navigate("/artikel")
    }

    const infoCreate = () => {
        messageApi.info("Artikel berhasil disimpan")
    }

    const infoUpdate = () => {
        messageApi.success("Artikel berhasil diperbarui")
    }

    const infoDelete = () => {
        messageApi.success("Artikel berhasil dihapus")
    }
    return (
        <>
            {contextHolder}
            <Space direction="vertical" size={16} className="w-full min-h-screen flex items-center">
                <Card title={
                    <div className="flex justify-between">
                        <span>
                        {artikelData ? "Perbarui Artikel" : "Buat Artikel"}
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
                }
                    style={{ width : 800 }}>
                    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={handleFinish}>
                        <Form.Item
                            label= "Judul"
                            name= "judul"
                            rules={[{ required : true, message: "Judul wajid diisi!"}]}>
                            <Input placeholder="Masukan Judul"/>
                        </Form.Item>
                        <Form.Item
                            label= "Konten"
                            name= "konten"
                            rules={[{ required : true, message: "Judul wajid diisi!"}]}>
                            <Input.TextArea rows={4} placeholder="Isi konten..."/>
                        </Form.Item>
                        <Form.Item
                            label= "Kategori"
                            name= "kategori"
                            rules={[{ required : true, message: "Pilih kategori!"}]}>
                            <Select placeholder="Pilih kategori!" loading={kategoriLoading}>
                                {kategoriList.map((k) => (
                                    <Select.Option key={k.id} value={k.id}>
                                        {k.nama}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label= "Tags"
                            name= "tags"
                            rules={[{ required : true, message: "Pilih minimal 1 tag!"}]}>
                            <Checkbox.Group disabled={tagLoading}>
                                <Space>
                                    {tagList.map((t) => (
                                        <Checkbox key={t.id} value={t.id}>  
                                            {t.nama}
                                        </Checkbox>
                                    ))}
                                </Space>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item
                            label= "Status"
                            name= "status"
                            rules={[{ required : true, message: "Pilih status artikel!"}]}>
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <SubmitButton type="primary" form={form}>
                                    {artikelData ? "perbarui" : "simpan" }
                                </SubmitButton>
                                <Button onClick={handleCancel}>
                                    Batal
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </>
    )
}