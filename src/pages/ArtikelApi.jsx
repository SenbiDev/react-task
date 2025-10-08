import { useEffect, useState, useMemo } from "react"
import { ConfigProvider, Button, message, Tabs, Input, Select, Space, Pagination, theme } from "antd"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useArtikelStore } from "../store/useArtikelStore"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import ArtikelList from "../components/ArtikelList"
import ArtikelContainer from "../components/ArtikelContainer"

const { Search } = Input

export default function ArtikelApi() {
  const { user } = useAuthStore()
  const role = user?.role || "user"
  const { fetchArtikel, artikel = [], deleteArtikel, pagination } = useArtikelStore()
  const { fetchKategori, kategori = [] } = useKategoriStore()
  const { fetchTags, tags = [] } = useTagStore()

  const [search, setSearch] = useState("")
  const [filterKategori, setFilterKategori] = useState(null)
  const [filterTags, setFilterTags] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [myPage, setMyPage] = useState(1)
  const [allMyArtikel, setAllMyArtikel] = useState([])
  const pageSize = 10

  const { token } = theme.useToken()

  useEffect(() => {
    fetchArtikel({ page: currentPage, search, kategori: filterKategori, tags: filterTags })
  }, [currentPage, search, filterKategori, filterTags])

  useEffect(() => {
    fetchKategori()
    fetchTags()
  }, [])

  const myArtikel = useMemo(
    () => artikel.filter((a) => a.is_owner || a.penulis_id === user?.id || a.penulis?.id === user?.id),
    [artikel, user]
  )

  useEffect(() => {
    const loadAllMyArtikel = async () => {
      const res = await fetchArtikel({ page: 1 })
      if (res?.results) {
        const all = [...res.results]
        for (let i = 2; i <= (res.pages || 1); i++) {
          const next = await fetchArtikel({ page: i })
          if (next?.results) all.push(...next.results)
        }
        const mine = all.filter((a) => a.is_owner || a.penulis_id === user?.id || a.penulis?.id === user?.id)
        setAllMyArtikel(mine)
      }
    }
    loadAllMyArtikel()
  }, [user])

  const paginatedMyArtikel = useMemo(() => {
    const start = (myPage - 1) * pageSize
    return allMyArtikel.slice(start, start + pageSize)
  }, [allMyArtikel, myPage])

  const publicArtikel = useMemo(() => artikel.filter((a) => a.status === "published"), [artikel])

  const handleDelete = async (id) => {
    try {
      await deleteArtikel(id)
      message.success("Artikel berhasil dihapus")
      fetchArtikel({ page: currentPage })
      setAllMyArtikel((prev) => prev.filter((a) => a.id !== id))
    } catch {
      message.error("Gagal menghapus artikel")
    }
  }

  const userTabs = [
    {
      key: "my",
      label: "Artikel Saya",
      children: (
        <ArtikelContainer title="Artikel Saya">
          <ArtikelList artikel={paginatedMyArtikel} onDelete={handleDelete} isMyList />
          {allMyArtikel.length > pageSize && (
            <Pagination
              current={myPage}
              total={allMyArtikel.length}
              pageSize={pageSize}
              onChange={setMyPage}
              style={{ marginTop: 16, textAlign: "center" }}
              showSizeChanger={false}
              showLessItems
            />
          )}
        </ArtikelContainer>
      ),
    },
  ]

  const adminTabs = [
    ...userTabs,
    {
      key: "public",
      label: "Artikel Publik",
      children: (
        <ArtikelContainer title="Artikel Publik">
          <ArtikelList artikel={publicArtikel} onDelete={handleDelete} />
          <Pagination
            current={pagination.current_page || currentPage}
            total={pagination.count || 0}
            pageSize={10}
            onChange={setCurrentPage}
            style={{ marginTop: 16, textAlign: "center" }}
            showSizeChanger={false}
            showLessItems
          />
        </ArtikelContainer>
      ),
    },
  ]

  return (
    <ConfigProvider
      theme={{
        algorithm: document.documentElement.getAttribute("data-theme") === "dark"
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
      }}
    >
      <div
        style={{
          backgroundColor: token.colorBgContainer,
          color: token.colorText,
          minHeight: "100vh",
          padding: "1.5rem",
          maxWidth: 960,
          margin: "0 auto",
          borderRadius: 12,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: token.colorText }}>
            Dashboard Artikel ({role})
          </h2>
          <Link to="/create-artikel">
            <Button type="primary">Create Artikel</Button>
          </Link>
        </div>

        <Space style={{ marginBottom: 16 }} wrap>
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
            options={kategori.map((k) => ({ value: k.id, label: k.nama }))}
          />
          <Select
            mode="multiple"
            placeholder="Filter Tags"
            allowClear
            onChange={setFilterTags}
            style={{ width: 240 }}
            options={tags.map((t) => ({ value: t.id, label: t.nama }))}
          />
        </Space>

        <Tabs defaultActiveKey="my" items={role === "admin" ? adminTabs : userTabs} />
      </div>
    </ConfigProvider>
  )
}