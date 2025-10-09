import { useEffect, useState, useMemo, useCallback } from "react"
import {
  ConfigProvider,
  Button,
  message,
  Tabs,
  Input,
  Select,
  Space,
  Pagination,
  Modal,
  theme,
} from "antd"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useArtikelStore } from "../store/useArtikelStore"
import { useKategoriStore } from "../store/useKategoriStore"
import { useTagStore } from "../store/useTagStore"
import ArtikelList from "../components/ArtikelList"
import ArtikelContainer from "../components/ArtikelContainer"

const { Search } = Input
const PAGE_SIZE = 10

export default function ArtikelApi() {
  const { user } = useAuthStore()
  const role = user?.role || "user"

  const {
    fetchArtikel,
    artikel = [],
    deleteArtikel,
    pagination,
  } = useArtikelStore()

  const { fetchKategori, kategori = [], loading: loadingKategori } = useKategoriStore()
  const { fetchTags, tags = [], loading: loadingTag } = useTagStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [filterKategori, setFilterKategori] = useState(null)
  const [filterTags, setFilterTags] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const [allMyArtikel, setAllMyArtikel] = useState([])
  const [myPage, setMyPage] = useState(1)

  const { token } = theme.useToken()

  // === Fetch kategori & tag hanya sekali ===
  useEffect(() => {
    fetchKategori()
    fetchTags()
  }, [fetchKategori, fetchTags])

  // === Fetch artikel publik (filter, search, pagination) ===
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchArtikel({
        page: currentPage,
        search: searchQuery.trim(),
        kategori: filterKategori,
        tags: filterTags,
      })
    }, 400)
    return () => clearTimeout(timeout)
  }, [fetchArtikel, currentPage, searchQuery, filterKategori, filterTags])

  // === Fetch semua artikel user (pagination manual di frontend) ===
  useEffect(() => {
    const loadUserArticles = async () => {
      const firstPage = await fetchArtikel({ page: 1 })
      if (!firstPage?.results) return

      let all = [...firstPage.results]
      for (let i = 2; i <= (firstPage.pages || 1); i++) {
        const next = await fetchArtikel({ page: i })
        if (next?.results) all.push(...next.results)
      }

      const mine = all.filter(
        (a) =>
          a.is_owner ||
          a.penulis_id === user?.id ||
          a.penulis?.id === user?.id
      )
      setAllMyArtikel(mine)
    }

    if (user?.id) loadUserArticles()
  }, [user, fetchArtikel])

  // === Pagination manual artikel saya ===
  const paginatedMyArtikel = useMemo(() => {
    const start = (myPage - 1) * PAGE_SIZE
    return allMyArtikel.slice(start, start + PAGE_SIZE)
  }, [allMyArtikel, myPage])

  // === Artikel publik (published only) ===
  const publicArtikel = useMemo(
    () => artikel.filter((a) => a.status === "published"),
    [artikel]
  )

  // === Konfirmasi hapus artikel ===
  const showDeleteConfirm = useCallback(
    (id) => {
      Modal.confirm({
        title: "Konfirmasi Hapus",
        content: "Apakah Anda yakin ingin menghapus artikel ini?",
        okText: "Ya, Hapus",
        cancelText: "Batal",
        okButtonProps: { danger: true },
        centered: true,
        onOk: async () => {
          try {
            await deleteArtikel(id)
            message.success("Artikel berhasil dihapus")
            fetchArtikel({ page: currentPage })
            setAllMyArtikel((prev) => prev.filter((a) => a.id !== id))
          } catch {
            message.error("Gagal menghapus artikel")
          }
        },
      })
    },
    [deleteArtikel, fetchArtikel, currentPage]
  )

  // === Tabs ===
  const userTabs = [
    {
      key: "my",
      label: "Artikel Saya",
      children: (
        <ArtikelContainer title="Artikel Saya">
          <ArtikelList
            artikel={paginatedMyArtikel}
            onDelete={showDeleteConfirm}
            isMyList
          />
          {allMyArtikel.length > PAGE_SIZE && (
            <Pagination
              current={myPage}
              total={allMyArtikel.length}
              pageSize={PAGE_SIZE}
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
          <ArtikelList artikel={publicArtikel} onDelete={showDeleteConfirm} />
          <Pagination
            current={pagination.current_page || currentPage}
            total={pagination.count || 0}
            pageSize={PAGE_SIZE}
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
        algorithm:
          document.documentElement.getAttribute("data-theme") === "dark"
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
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 700, color: token.colorText }}>
            Dashboard Artikel ({role})
          </h2>
          <Link to="/create-artikel">
            <Button type="primary">Create Artikel</Button>
          </Link>
        </div>

        {/* Filter */}
        <Space style={{ marginBottom: 16 }} wrap>
          <Search
            placeholder="Cari artikel..."
            allowClear
            value={searchQuery}
            onChange={(e) => {
              setCurrentPage(1)
              setSearchQuery(e.target.value)
            }}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Filter Kategori"
            allowClear
            loading={loadingKategori}
            value={filterKategori}
            onChange={(v) => {
              setCurrentPage(1)
              setFilterKategori(v)
            }}
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
            loading={loadingTag}
            value={filterTags}
            onChange={(v) => {
              // backend hanya menerima satu tag → ambil hanya yang pertama
              setCurrentPage(1)
              setFilterTags(v.slice(0, 1))
            }}
            style={{ width: 240 }}
            options={tags.map((t) => ({
              value: t.id,
              label: t.nama,
            }))}
          />
        </Space>

        {/* Tabs */}
        <Tabs
          defaultActiveKey="my"
          items={role === "admin" ? adminTabs : userTabs}
        />
      </div>
    </ConfigProvider>
  )
}