import { useState, useEffect, useCallback } from "react"
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Card,
  Spin,
  message,
  Typography,
  Space,
  theme,
} from "antd"
import "@ant-design/v5-patch-for-react-19"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import {
  createArticle,
  getArticleById,
  updateArticle,
} from "../axiosApi/artikel"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import { useAuthStore } from "../store/useAuthStore"

const { TextArea } = Input
const { Title } = Typography

export default function CreateArtikel() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuthStore()
  const { token } = theme.useToken()

  // === store state ===
  const { kategori, fetchKategori, loading: loadingKategori } = useKategoriStore()
  const { tags, fetchTags, loading: loadingTags } = useTagStore()

  // === local state ===
  const [saving, setSaving] = useState(false)
  const [loadingArtikel, setLoadingArtikel] = useState(false)

  // === Load kategori dan tag ===
  useEffect(() => {
    fetchKategori()
    fetchTags()
  }, [fetchKategori, fetchTags])

  // === Load artikel jika sedang edit ===
  useEffect(() => {
    if (!id) return
    const loadArtikel = async () => {
      setLoadingArtikel(true)
      try {
        const artikel = await getArticleById(id)
        if (artikel) {
          form.setFieldsValue({
            judul: artikel.judul,
            konten: artikel.konten,
            status: artikel.status,
            kategori_id: artikel.kategori?.id || artikel.kategori_id,
            tags: Array.isArray(artikel.tags)
              ? artikel.tags.map((t) => t.id)
              : [],
          })
        }
      } catch {
        message.error("Gagal memuat artikel")
      } finally {
        setLoadingArtikel(false)
      }
    }
    loadArtikel()
  }, [id, form])

  // === Submit handler ===
  const handleSubmit = useCallback(
    async (values) => {
      setSaving(true)
      try {
        const payload = {
          judul: values.judul,
          konten: values.konten,
          status: values.status,
          kategori_id: values.kategori_id,
          tag_ids: values.tags || [],
          penulis_id: user?.id,
        }

        if (id) {
          await updateArticle(id, payload)
          message.success("Artikel berhasil diperbarui")
        } else {
          await createArticle(payload)
          message.success("Artikel berhasil dibuat")
        }

        navigate("/artikel-api")
      } catch (err) {
        message.error(err.message || "Terjadi kesalahan saat menyimpan artikel")
      } finally {
        setSaving(false)
      }
    },
    [id, navigate, user]
  )

  // === Loading state gabungan ===
  const isLoading = loadingTags || loadingKategori || loadingArtikel

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "6rem",
          color: token.colorTextBase,
        }}
      >
        <Spin spinning tip="Memuat data artikel..." />
      </div>
    )
  }

  // === UI utama ===
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: token.colorBgBase,
        color: token.colorTextBase,
        minHeight: "100vh",
      }}
    >
      <Card
        title={
          <Space
            align="center"
            style={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Title
              level={4}
              style={{
                margin: 0,
                color: token.colorTextHeading,
              }}
            >
              {id ? "Edit Artikel" : "Buat Artikel Baru"}
            </Title>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/artikel-api")}
            >
              Kembali
            </Button>
          </Space>
        }
        style={{
          width: 600,
          backgroundColor: token.colorBgContainer,
          color: token.colorTextBase,
          border: `1px solid ${token.colorBorder}`,
          borderRadius: token.borderRadius,
          boxShadow: token.boxShadowTertiary,
        }}
        bodyStyle={{ padding: "1.5rem" }}
        headStyle={{
          borderBottom: `1px solid ${token.colorBorder}`,
          padding: "1rem 1.5rem",
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ status: "draft" }}
          style={{ marginTop: "1rem" }}
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
            <Select
              options={[
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Kategori"
            name="kategori_id"
            rules={[{ required: true, message: "Pilih kategori" }]}
          >
            <Select
              placeholder="Pilih kategori"
              loading={loadingKategori}
              options={kategori.map((k) => ({
                label: k.nama,
                value: k.id,
              }))}
            />
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Checkbox.Group
              options={tags.map((t) => ({
                label: t.nama,
                value: t.id,
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              block
              size="large"
            >
              {id ? "Update Artikel" : "Simpan Artikel"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}