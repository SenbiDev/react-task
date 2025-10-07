// src/pages/CreateArtikel.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Row,
  Col,
  message,
  Card,
} from "antd";
import '@ant-design/v5-patch-for-react-19';
import { useArtikelStore } from "../store/artikelStore";
import { useTagStore } from "../store/tagStore";
import { useKategoriStore } from "../store/kategoriStore";

const { Option } = Select;

export default function CreateArtikel() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const {
    selected,
    setSelected,
    resetForm,
    createArtikel, 
    updateArtikel, 
  } = useArtikelStore();

  // ambil tag & kategori dari store
  const { tags: tagList = [], fetchTags, loading: tagLoading } = useTagStore();
  const {
    kategori: kategoriList = [],
    fetchKategori,
    loading: kategoriLoading,
  } = useKategoriStore();

  // load kategori & tag saat mount
  useEffect(() => {
    if (typeof fetchKategori === "function") fetchKategori();
    if (typeof fetchTags === "function") fetchTags();
  }, [fetchKategori, fetchTags]);

  // prefill form saat edit
  useEffect(() => {
    if (selected) {
      form.setFieldsValue({
        judul: selected.judul ?? "",
        konten: selected.konten ?? "",
        kategori_id:
          (selected.kategori && selected.kategori.id) ??
          selected.kategori_id ??
          undefined,
        tags_ids:
          (selected.tags && selected.tags.map((t) => t.id)) ||
          selected.tags_ids ||
          [],
        status: selected.status ?? "draft",
      });
    } else {
      form.resetFields();
    }
  }, [selected, form]);

  // submit handler (pakai createArtikel/updateArtikel dari store)
  const handleFinish = async (values) => {
    const payload = {
      judul: values.judul,
      konten: values.konten,
      kategori_id: values.kategori_id ?? null,
      tag_ids: values.tag_ids || [],
      status: values.status || "draft",
    };

    setSubmitting(true);
    try {
      if (selected) {
        // update via store function
        await updateArtikel(selected.id, payload);
        message.success("Artikel berhasil diperbarui");
        setSelected(null);
        resetForm();
        navigate("/artikel");
      } else {
        // create via store function
        await createArtikel(payload);
        message.success("Artikel berhasil dibuat");
        resetForm();
        navigate("/artikel");
      }
    } catch (err) {
      console.error("Gagal menyimpan artikel:", err?.response?.data ?? err);
      const detail = err?.response?.data
        ? JSON.stringify(err.response.data)
        : "";
      message.error("Gagal menyimpan artikel. " + detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={selected ? "Edit Artikel" : "Buat Artikel Baru"}
        extra={
          <Button
            type="default"
            onClick={() => {
              setSelected(null);
              resetForm();
              form.resetFields();
              navigate("/artikel");
            }}
          >
            Kembali
          </Button>
        }
        style={{ maxWidth: 800, margin: "auto" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
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
            <Input.TextArea rows={6} placeholder="Masukkan isi artikel" />
          </Form.Item>

          <Form.Item
            label="Kategori"
            name="kategori_id"
            rules={[{ required: true, message: "Pilih kategori" }]}
          >
            <Select
              placeholder={kategoriLoading ? "Memuat kategori..." : "Pilih kategori"}
              loading={kategoriLoading}
              allowClear
            >
              {kategoriList?.map((kat) => (
                <Option key={kat.id} value={kat.id}>
                  {kat.nama}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Tag" name="tag_ids">
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                {tagList && tagList.length > 0 ? (
                  tagList.map((tag) => (
                    <Col span={8} key={tag.id} style={{ marginBottom: 8 }}>
                      <Checkbox value={tag.id}>{tag.nama}</Checkbox>
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <em>Memuat tag...</em>
                  </Col>
                )}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Pilih status" }]}
          >
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="published">Published</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", gap: 8 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {selected ? "Update Artikel" : "Simpan Artikel"}
              </Button>

              {selected && (
                <Button
                  onClick={() => {
                    setSelected(null);
                    resetForm();
                    form.resetFields();
                  }}
                >
                  Batal
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
