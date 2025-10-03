import { useState, useEffect } from "react"
import { Card, Input, Button, List, Space, theme, Typography } from "antd"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import { useAuthStore } from "../store/useAuthStore"

const { Title } = Typography

export default function KategoriTags() {
  const { user } = useAuthStore()
  const {
    kategori,
    fetchKategori,
    addKategori,
    updateKategori,
    deleteKategori,
  } = useKategoriStore()
  const { tags, fetchTags, addTag, updateTag, deleteTag } = useTagStore()
  const { token } = theme.useToken()

  const [newKategori, setNewKategori] = useState("")
  const [editKategoriId, setEditKategoriId] = useState(null)
  const [newTag, setNewTag] = useState("")
  const [editTagId, setEditTagId] = useState(null)

  useEffect(() => {
    fetchKategori()
    fetchTags()
  }, [fetchKategori, fetchTags])

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
        setEditKategoriId(null)
      } else {
        await addKategori({ nama: newKategori })
      }
      setNewKategori("")
    } catch (err) {
      console.error("Gagal simpan kategori:", err)
    }
  }

  const handleEditKategori = (k) => {
    setEditKategoriId(k.id)
    setNewKategori(k.nama)
  }

  const handleDeleteKategori = async (id) => {
    if (!window.confirm("Yakin hapus kategori ini?")) return
    await deleteKategori(id)
  }

  const handleSaveTag = async () => {
    if (!newTag.trim()) return
    try {
      if (editTagId) {
        await updateTag(editTagId, { nama: newTag })
        setEditTagId(null)
      } else {
        await addTag({ nama: newTag })
      }
      setNewTag("")
    } catch (err) {
      console.error("Gagal simpan tag:", err)
    }
  }

  const handleEditTag = (t) => {
    setEditTagId(t.id)
    setNewTag(t.nama)
  }

  const handleDeleteTag = async (id) => {
    if (!window.confirm("Yakin hapus tag ini?")) return
    await deleteTag(id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {/* Kategori */}
      <Card
        title={<Title level={4}>Kelola Kategori</Title>}
        variant="outlined"
        styles={{
          header: {
            background: token.colorBgElevated,
            color: token.colorTextHeading,
          },
          body: {
            background: token.colorBgContainer,
            color: token.colorText,
          },
        }}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
        }}
      >
        <Space.Compact style={{ width: "100%", marginBottom: "12px" }}>
          <Input
            placeholder="Nama kategori"
            value={newKategori}
            onChange={(e) => setNewKategori(e.target.value)}
          />
          <Button type="primary" onClick={handleSaveKategori}>
            {editKategoriId ? "Update" : "Tambah"}
          </Button>
        </Space.Compact>

        <List
          dataSource={kategori}
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadius,
            overflow: "hidden",
          }}
          renderItem={(k) => (
            <List.Item
              style={{
                background: token.colorBgElevated,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                color: token.colorText,
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

      {/* Tags */}
      <Card
        title={<Title level={4}>Kelola Tags</Title>}
        variant="outlined"
        styles={{
          header: {
            background: token.colorBgElevated,
            color: token.colorTextHeading,
          },
          body: {
            background: token.colorBgContainer,
            color: token.colorText,
          },
        }}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
        }}
      >
        <Space.Compact style={{ width: "100%", marginBottom: "12px" }}>
          <Input
            placeholder="Nama tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <Button type="primary" onClick={handleSaveTag}>
            {editTagId ? "Update" : "Tambah"}
          </Button>
        </Space.Compact>

        <List
          dataSource={tags}
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadius,
            overflow: "hidden",
          }}
          renderItem={(t) => (
            <List.Item
              style={{
                background: token.colorBgElevated,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                color: token.colorText,
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
    </div>
  )
}