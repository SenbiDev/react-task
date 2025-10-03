import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Card,
  Spin,
  message,
} from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { createArticle } from "../axiosApi/artikel";
import { useTagList } from "../hooks/tags";
import { useKategoriList } from "../hooks/kategori";

const { TextArea } = Input;

export default function CreateArtikel() {
  const [loading, setLoading] = useState(false);
  const { tags = [], isLoading: loadingTags } = useTagList();
  const { kategori = [], isLoading: loadingKategori } = useKategoriList();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        judul: values.judul,
        konten: values.konten,
        status: values.status,
        penulis_id: user?.id,
        kategori_id: values.kategori,
        tag_ids: values.tags || [],
      };

      await createArticle(payload);
      message.success("Artikel berhasil dibuat!");
      navigate("/artikel-api");
    } catch (err) {
      message.error(err.message || "Terjadi kesalahan saat membuat artikel");
    } finally {
      setLoading(false);
    }
  };

  if (loadingTags || loadingKategori) {
    return (
      <div className="flex justify-center mt-20">
        <Spin tip="Memuat kategori & tags..." />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <Card
        title={
          <div className="flex items-center justify-between">
            <span className="font-semibold">Buat Artikel Baru</span>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/artikel-api")}
            >
              Kembali
            </Button>
          </div>
        }
        style={{ width: 600 }}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={{ status: "draft" }}>
          <Form.Item
            label="Judul"
            name="judul"
            rules={[{ required: true, message: "Judul wajib diisi" }]}
          >
            <Input placeholder="Masukkan judul artikel" />
          </Form.Item>

          <Form.Item
            label="Konten"
            name="konten"
            rules={[{ required: true, message: "Konten wajib diisi" }]}
          >
            <TextArea rows={6} placeholder="Tulis konten artikel..." />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Pilih status artikel" }]}
          >
            <Select>
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="published">Published</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Kategori"
            name="kategori"
            rules={[{ required: true, message: "Pilih kategori" }]}
          >
            <Select placeholder="Pilih kategori">
              {kategori.map((k) => (
                <Select.Option key={k.id} value={k.id}>
                  {k.nama}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Checkbox.Group>
              {tags.map((t) => (
                <Checkbox key={t.id} value={t.id}>
                  {t.nama}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Simpan Artikel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}