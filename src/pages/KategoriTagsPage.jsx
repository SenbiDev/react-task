import { useState, useEffect } from "react"
import { Card, Input, Button, List, Space, theme, message, Modal, Spin } from "antd"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import { useAuthStore } from "../store/useAuthStore"
import "@ant-design/v5-patch-for-react-19"
import { useNavigate } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"

export default function KategoriTagsPage() {
  const { user } = useAuthStore()
  const {
    kategori,
    fetchKategori,
    addKategori,
    updateKategori,
    deleteKategori,
    loading: loadingKategori,
    error: errorKategori,
  } = useKategoriStore()

  const {
    tags,
    fetchTags,
    addTag,
    updateTag,
    deleteTag,
    loading: loadingTag,
    error: errorTag,
  } = useTagStore()

  const { token } = theme.useToken()
  const navigate = useNavigate()

  const [newKategori, setNewKategori] = useState("")
  const [editKategoriId, setEditKategoriId] = useState(null)
  const [newTag, setNewTag] = useState("")
  const [editTagId, setEditTagId] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchKategori(), fetchTags()])
    }
    loadData()
  }, [])

  useEffect(() => {
    if (errorKategori) message.error(errorKategori)
    if (errorTag) message.error(errorTag)
  }, [errorKategori, errorTag])

  if (!user || user.role !== "admin") {
    return (
      <p style={{ color: token.colorTextSecondary }}>
        Hanya admin yang bisa mengelola kategori & tags.
      </p>
    )
  }

  const handleSaveKategori = async () => {
    if (!newKategori.trim()) return
    try {
      if (editKategoriId) {
        await updateKategori(editKategoriId, { nama: newKategori })
        message.success("Kategori berhasil diupdate!")
        setEditKategoriId(null)
      } else {
        await addKategori({ nama: newKategori })
        message.success("Kategori berhasil dibuat!")
      }
      setNewKategori("")
    } catch {
      message.error("Gagal menyimpan kategori")
    }
  }

  const handleEditKategori = (k) => {
    setEditKategoriId(k.id)
    setNewKategori(k.nama)
  }

  const handleDeleteKategori = (id) => {
    Modal.confirm({
      title: "Konfirmasi Hapus",
      content: "Apakah Anda yakin ingin menghapus kategori ini?",
      okText: "Ya, Hapus",
      cancelText: "Batal",
      okButtonProps: { danger: true },
      centered: true,
      async onOk() {
        try {
          await deleteKategori(id)
          message.success("Kategori berhasil dihapus!")
        } catch {
          message.error("Gagal menghapus kategori")
        }
      },
    })
  }

  const handleSaveTag = async () => {
    if (!newTag.trim()) return
    try {
      if (editTagId) {
        await updateTag(editTagId, { nama: newTag })
        message.success("Tag berhasil diupdate!")
        setEditTagId(null)
      } else {
        await addTag({ nama: newTag })
        message.success("Tag berhasil dibuat!")
      }
      setNewTag("")
    } catch {
      message.error("Gagal menyimpan tag")
    }
  }

  const handleEditTag = (t) => {
    setEditTagId(t.id)
    setNewTag(t.nama)
  }

  const handleDeleteTag = (id) => {
    Modal.confirm({
      title: "Konfirmasi Hapus",
      content: "Apakah Anda yakin ingin menghapus tag ini?",
      okText: "Ya, Hapus",
      cancelText: "Batal",
      okButtonProps: { danger: true },
      centered: true,
      async onOk() {
        try {
          await deleteTag(id)
          message.success("Tag berhasil dihapus!")
        } catch {
          message.error("Gagal menghapus tag")
        }
      },
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-6 mt-4">
      <Card
        title="Kelola Kategori"
        loading={loadingKategori}
        variant="outlined"
        styles={{
          header: {
            background: token.colorBgElevated,
            color: token.colorText,
            fontWeight: 600,
          },
          body: {
            background: token.colorBgContainer,
            color: token.colorText,
          },
        }}
      >
        <Space.Compact style={{ width: "100%", marginBottom: 12 }}>
          <Input
            placeholder="Nama kategori"
            value={newKategori}
            onChange={(e) => setNewKategori(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleSaveKategori}
            loading={loadingKategori}
          >
            {editKategoriId ? "Update" : "Tambah"}
          </Button>
        </Space.Compact>

        <List
          dataSource={kategori}
          loading={loadingKategori}
          renderItem={(k) => (
            <List.Item
              style={{
                background: token.colorBgElevated,
                borderColor: token.colorBorderSecondary,
              }}
              actions={[
                <Button size="small" onClick={() => handleEditKategori(k)}>
                  Edit
                </Button>,
                <Button
                  size="small"
                  danger
                  onClick={() => handleDeleteKategori(k.id)}
                >
                  Hapus
                </Button>,
              ]}
            >
              {k.nama}
            </List.Item>
          )}
        />
      </Card>

      <Card
        title="Kelola Tags"
        loading={loadingTag}
        variant="outlined"
        styles={{
          header: {
            background: token.colorBgElevated,
            color: token.colorText,
            fontWeight: 600,
          },
          body: {
            background: token.colorBgContainer,
            color: token.colorText,
          },
        }}
      >
        <Space.Compact style={{ width: "100%", marginBottom: 12 }}>
          <Input
            placeholder="Nama tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <Button type="primary" onClick={handleSaveTag} loading={loadingTag}>
            {editTagId ? "Update" : "Tambah"}
          </Button>
        </Space.Compact>

        <List
          dataSource={tags}
          loading={loadingTag}
          renderItem={(t) => (
            <List.Item
              style={{
                background: token.colorBgElevated,
                borderColor: token.colorBorderSecondary,
              }}
              actions={[
                <Button size="small" onClick={() => handleEditTag(t)}>
                  Edit
                </Button>,
                <Button
                  size="small"
                  danger
                  onClick={() => handleDeleteTag(t.id)}
                >
                  Hapus
                </Button>,
              ]}
            >
              {t.nama}
            </List.Item>
          )}
        />
      </Card>

      <div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/artikel-api")}
        >
          Kembali
        </Button>
      </div>
    </div>
  )
}