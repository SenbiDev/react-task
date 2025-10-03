import { useState, useEffect } from "react"
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Card,
  Spin,
  message,
} from "antd"
import "@ant-design/v5-patch-for-react-19"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"

import { createArticle, getArticleById, updateArticle } from "../axiosApi/artikel"
import { useTagList } from "../hooks/tags"
import { useKategoriList } from "../hooks/kategori"

const { TextArea } = Input

export default function CreateArtikel() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(false)

  const { tags = [], isLoading: loadingTags } = useTagList()
  const { kategori = [], isLoading: loadingKategori } = useKategoriList()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchArtikel = async () => {
      if (!id) return
      setInitialLoading(true)
      try {
        const artikel = await getArticleById(id)
        if (artikel) {
          form.setFieldsValue({
            judul: artikel.judul,
            konten: artikel.konten,
            status: artikel.status,
            kategori_id: artikel.kategori_id || artikel.kategori?.id, 
            tags: artikel.tags?.map((t) => t.id) || [],
          })
        }
      } catch (err) {
        message.error("Gagal memuat artikel")
      } finally {
        setInitialLoading(false)
      }
    }
    fetchArtikel()
  }, [id, form])

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      const payload = {
        judul: values.judul,
        konten: values.konten,
        status: values.status,
        penulis_id: user?.id,
        kategori_id: values.kategori_id, 
        tag_ids: values.tags || [],
      }

      if (id) {
        await updateArticle(id, payload)
        message.success("Artikel berhasil diperbarui!")
      } else {
        await createArticle(payload)
        message.success("Artikel berhasil dibuat!")
      }
      navigate("/artikel-api")
    } catch (err) {
      message.error(err.message || "Terjadi kesalahan saat menyimpan artikel")
    } finally {
      setLoading(false)
    }
  }

  if (loadingTags || loadingKategori || initialLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Spin tip="Memuat data artikel..." />
      </div>
    )
  }

  return (
    <div className="flex justify-center mt-10">
      <Card
        title={
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {id ? "Edit Artikel" : "Buat Artikel Baru"}
            </span>
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
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: "draft" }}
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
            name="kategori_id" 
            rules={[{ required: true, message: "Pilih kategori" }]}
          >
            <Select 
              placeholder="Pilih kategori"
              options={kategori.map((k) => ({
                label: k.nama,
                value: k.id,
              }))}
            />
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
              {id ? "Update Artikel" : "Simpan Artikel"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}