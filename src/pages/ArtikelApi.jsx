import { useEffect, useState, useMemo } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useArtikelStore } from "../store/useArtikelStore"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import ArtikelList from "../components/ArtikelList"
import ArtikelContainer from "../components/ArtikelContainer"
import { Button, message, Tabs, Input, Select, Space } from "antd"
import { Link } from "react-router-dom"

const { Search } = Input

export default function ArtikelApi() {
  const { user } = useAuthStore()
  const role = user?.role || "user"

  const { fetchArtikel, artikel = [], deleteArtikel } = useArtikelStore()
  const { fetchKategori, kategori = [] } = useKategoriStore()
  const { fetchTags, tags = [] } = useTagStore()

  const [search, setSearch] = useState("")
  const [filterKategori, setFilterKategori] = useState(null)
  const [filterTags, setFilterTags] = useState([])

  useEffect(() => {
    fetchArtikel()
    fetchKategori()
    fetchTags()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteArtikel(id)
      message.success("Artikel berhasil dihapus")
    } catch (err) {
      message.error("Gagal menghapus artikel")
    }
  }

  const filteredArtikel = useMemo(() => {
    return artikel.filter((a) => {
      const matchSearch =
        a.judul?.toLowerCase().includes(search.toLowerCase()) ||
        a.konten?.toLowerCase().includes(search.toLowerCase())

      const matchKategori = filterKategori
        ? a.kategori?.id === filterKategori
        : true

      const matchTags =
        filterTags.length > 0
          ? a.tags?.some((t) => filterTags.includes(t.id))
          : true

      return matchSearch && matchKategori && matchTags
    })
  }, [artikel, search, filterKategori, filterTags])

  const myArtikel = filteredArtikel.filter(
    (a) =>
      a.is_owner || a.penulis_id === user?.id || a.penulis?.id === user?.id
  )

  const publicArtikel = filteredArtikel.filter((a) => a.status === "published")

  const userTabs = [
    {
      key: "my",
      label: "Artikel Saya",
      children: (
        <ArtikelContainer title="Artikel Saya">
          <ArtikelList artikel={myArtikel} onDelete={handleDelete} isMyList />
        </ArtikelContainer>
      ),
    },
  ]

  const adminTabs = [
    {
      key: "my",
      label: "Artikel Saya",
      children: (
        <ArtikelContainer title="Artikel Saya">
          <ArtikelList artikel={myArtikel} onDelete={handleDelete} isMyList />
        </ArtikelContainer>
      ),
    },
    {
      key: "public",
      label: "Artikel Publik",
      children: (
        <ArtikelContainer title="Artikel Publik">
          <ArtikelList artikel={publicArtikel} onDelete={handleDelete} />
        </ArtikelContainer>
      ),
    },
  ]

  return (
    <div className="p-4 max-w-4xl mx-auto text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Dashboard Artikel ({role})</h2>
        <Link to="/create-artikel">
          <Button type="primary">Create Artikel</Button>
        </Link>
      </div>

      {/* 🔹 Search & Filter */}
      <Space className="mb-4" wrap>
        <Search
          placeholder="Cari artikel..."
          allowClear
          onSearch={setSearch}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Filter Kategori"
          allowClear
          onChange={setFilterKategori}
          style={{ width: 180 }}
          options={kategori.map((k) => ({
            value: k.id,
            label: k.nama,
          }))}
        />

        <Select
          mode="multiple"
          placeholder="Filter Tags"
          allowClear
          onChange={setFilterTags}
          style={{ width: 240 }}
          options={tags.map((t) => ({
            value: t.id,
            label: t.nama,
          }))}
        />
      </Space>

      {/* Tabs Ant Design */}
      <Tabs
        defaultActiveKey="my"
        items={role === "admin" ? adminTabs : userTabs}
      />
    </div>
  )
}