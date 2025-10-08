import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Button, Form, Input, Popconfirm, message, Row, Col, Space} from "antd";
import useAdminStore from "../store/adminStore";
import { useKategoriStore } from "../store/kategoriStore";
import { useTagStore } from "../store/tagStore";
import '@ant-design/v5-patch-for-react-19';
import Title from "antd/es/skeleton/Title";

const AdminPage = () => {
  const {
    selectedKategori,
    kategoriForm,
    setSelectedKategori,
    setKategoriForm,
    resetKategori,
    selectedTag,
    tagForm,
    setSelectedTag,
    setTagForm,
    resetTag,
  } = useAdminStore();

  const {
    kategori,
    fetchKategori,
    createKategori,
    updateKategori,
    deleteKategori,
    loading: loadingKategori,
  } = useKategoriStore();

  const {
    tags,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
    loading: loadingTag,
  } = useTagStore();

  const [formKategori] = Form.useForm();
  const [formTag] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchKategori();
    fetchTags();
  }, []);

  const handleSubmitKategori = async (values) => {
    try {
      if (selectedKategori) {
        await updateKategori(selectedKategori.id,values);
        message.success("Kategori berhasil diperbarui");
      } else {
        await createKategori(values);message.success("Kategori berhasil dibuat");
      }
      resetKategori();
      formKategori.resetFields();
    } catch {
      message.error("Terjadi kesalahan saat menyimpan kategori");
    }
  };

  const handleSubmitTag = async (values) => {
    try {
      if (selectedTag) {
        await updateTag(selectedTag.id,values);
        message.success("Tag berhasil diperbarui");
      } else {
        await createTag(values);message.success("Tag berhasil dibuat");
      }
      resetTag();
      formTag.resetFields();
    } catch {
      message.error("Terjadi kesalahan saat menyimpan tag");
    }
  };

  const kategoriColumns = [
    { title: "Nama", dataIndex: "nama", key: "nama"},
    { title: "Aksi", key: "aksi",
      render: (_, record) => (
        <>
          <Button
          size="small"
          onClick={() => {
            setSelectedKategori(record);setKategoriForm({ nama:record.nama });
            formKategori.setFieldsValue({ nama: record.nama });
          }}
          >Edit
          </Button>
          <Popconfirm 
          title="Hapus kategori ini?"
          onConfirm={() => deleteKategori(record.id)}>
            <Button size="small" danger style={{ marginLeft : 8 }}>
              Hapus
          </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const tagColumns = [
    { title: "Nama", dataIndex: "nama", key: "nama"},
    { title: "Aksi", key: "aksi",
      render: (_, record) => (
        <>
          <Button
          size="small"
          onClick={() => {
            setSelectedTag(record);setTagForm({ nama:record.nama });
            formTag.setFieldsValue({ nama: record.nama });
          }}
          >Edit
          </Button>
          <Popconfirm 
          title="Hapus tag ini?"
          onConfirm={() => deleteTag(record.id)}>
            <Button size="small" danger style={{ marginLeft : 8 }}>
              Hapus
          </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-8 text-white">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* { Headers } */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Kelola Kategori dan Tag</h1>
            <Button
            type="primary"
            onClick={() =>
              navigate("/artikel/")}>
                Kembali ke Dashboard Artikel
              </Button>
          </div>
          
      {/* {kategori} */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
        <Card title="Kelola kategori">
          <Form
          form={formKategori}
          layout="inline"
          onFinish={handleSubmitKategori}
          initialValues={kategoriForm}>
            <Form.Item
            name="nama"
            rules={[{ required:true,message:"nama kategori wajib isi"}]}>
              <Input 
              placeholder="Nama kategori"
              value={kategoriForm.nama}
              onChange={(e) => 
                setKategoriForm({ nama:e.target.value })}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary"
              htmlType="submit"
              loading={loadingKategori}>
                {selectedKategori ? "Update" : "Tambah" }
              </Button>
              {selectedKategori && (
                <Button
                style={{ marginLeft: 8 }}
                onClick={() => {
                  resetKategori();
                  formKategori.resetFields();
                }}>
                  Batal
                </Button>
              )}
            </Form.Item>
          </Form>
          <Table
          dataSource={kategori || []}
          columns={kategoriColumns}
          rowKey="id"
          style={{ marginLeft: 20 }}
          loading={loadingKategori}
          pagination={false}
          />
        </Card>
        </Col> 

      {/* {TAG} */}
        <Col xs={24} md={12} p={20}>
        <Card 
        title="Kelola tag">
          <Form
          form={formTag}
          layout="inline"
          onFinish={handleSubmitTag}
          initialValues={tagForm}>
            <Form.Item
            name="nama"
            rules={[{ required:true,message:"nama tag wajib isi"}]}>
              <Input 
              placeholder="Nama tag"
              value={tagForm.nama}
              onChange={(e) => 
                setTagForm({ nama:e.target.value })}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary"
              htmlType="submit"
              loading={loadingTag}>
                {selectedTag ? "Update" : "Tambah" }
              </Button>
              {selectedTag && (
                <Button
                style={{ marginLeft: 8 }}
                onClick={() => {
                  resetTag();
                  formTag.resetFields();
                }}>
                  Batal
                </Button>
              )}
            </Form.Item>
          </Form>
          <Table
            dataSource={tags || []}
            columns={tagColumns}
            rowKey="id"
            style={{ marginLeft: 20 }}
            loading={loadingTag}
            pagination={false}
          />
          </Card>
          </Col> 
        </Row>
      </div>
    </div>
  );
};

export default AdminPage;
