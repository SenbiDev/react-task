import { useState, useEffect } from "react"
import { Card, Input, Button, List, Space, theme, message } from "antd"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import { useAuthStore } from "../store/useAuthStore"
import "@ant-design/v5-patch-for-react-19";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function KategoriTagsPage() {
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

  const navigate = useNavigate();

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
        message.success("Kategori berhasil diupdate!");
        setEditKategoriId(null)
      } else {
        await addKategori({ nama: newKategori })
        message.success("Kategori berhasil dibuat!");
      }
      setNewKategori("")
    } catch (err) {
      message.error("Gagal simpan kategori:", err)
    }
  }

  const handleEditKategori = (k) => {
    setEditKategoriId(k.id)
    setNewKategori(k.nama)
  }

  const handleDeleteKategori = async (id) => {
    if (!window.confirm("Yakin hapus kategori ini?")) return
    await deleteKategori(id)
    message.success("Kategori berhasil dihapus!");
  }

  const handleSaveTag = async () => {
    if (!newTag.trim()) return
    try {
      if (editTagId) {
        await updateTag(editTagId, { nama: newTag })
        message.success("Tag berhasil diupdate!");
        setEditTagId(null)
      } else {
        await addTag({ nama: newTag })
        message.success("Tag berhasil dibuat!");
      }
      setNewTag("")
    } catch (err) {
      message.error("Gagal simpan tag:", err)
    }
  }

  const handleEditTag = (t) => {
    setEditTagId(t.id)
    setNewTag(t.nama)
  }

  const handleDeleteTag = async (id) => {
    if (!window.confirm("Yakin hapus tag ini?")) return
    await deleteTag(id)
    message.success("Kategori berhasil dihapus!");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-6 mt-4">
        {/* Kategori */}
        <Card
            title="Kelola Kategori"
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
            <Button type="primary" onClick={handleSaveKategori}>
                {editKategoriId ? "Update" : "Tambah"}
            </Button>
            </Space.Compact>

            <List
            dataSource={kategori}
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

        {/* Tags */}
        <Card
            title="Kelola Tags"
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
            <Button type="primary" onClick={handleSaveTag}>
                {editTagId ? "Update" : "Tambah"}
            </Button>
            </Space.Compact>

            <List
            dataSource={tags}
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
        <div className="">
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