import React from "react";
import { useArtikelStore } from "../store/useArtikelStore";
import { useKategoriStore, useTagStore } from "../store/useAdminStore";
import { Card, Button, Form, Input, Space, Select, Checkbox, Radio, message } from "antd";


export default function CreateArtikel () {
    const setJudul = useArtikelStore((state) => state.setJudul)
    const setKonten = useArtikelStore((state) => state.setKonten)
    const setKategori = useArtikelStore((state) => state.setKategori)
    const setTags = useArtikelStore((state) => state.setTags)
    const setStatus = useArtikelStore((state) => state.setStatus)
    const createArt = useArtikelStore((state) => state.createArt)
    

    const { data: kategoriList = [] } = useKategoriStore();
    const { data: tagList = [] } = useTagStore();

    const [form] = Form.useForm();

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

    const handleFinish = (values) => {
        setJudul(values.judul);
        setKonten(values.konten);
        setKategori(values.kategori);
        setTags(values.tags);
        setStatus(values.status);

        createArt(values);
        message.success("Artikel berhasil disimpan");
        form.resetFields();
    }
    return (
        <Space direction="vertical" size={16} className="w-full flex justify center">
            <Card title="Create Artikel" style={{ width : 600 }}>
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
                        <Select placeholder="Pilih kategori!">
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
                        <Checkbox.Group>
                            <Space>
                                {tagList.map((t) => (
                                    <Checkbox key={t.id} className="flex justify-center space-x-2">  
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
                            <SubmitButton form={form}>
                                Simpan artikel
                            </SubmitButton>
                            <Button htmlType="reset">
                                Batal
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}