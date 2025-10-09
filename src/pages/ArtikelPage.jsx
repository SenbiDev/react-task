// uselint-disable-next-line
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Tabs,
  Button,
  Table,
  Space,
  Popconfirm,
  message,
  Modal,
  Input,
  Row,
  Col,
  Select,
} from "antd";
import { useArtikelStore } from "../store/ArtikelStore";

const { Search } = Input;

export default function ArtikelPage() {
  const { artikels, kategoriList, tagList, deleteArtikel, fetchArtikel } = useArtikelStore();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const role = currentUser?.role || "user";
  const navigate = useNavigate();

  const [openView, setOpenView] = useState(false);
  const [selectedArtikel, setSelectedArtikel] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedKategori, setSelectedKategori] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [modal, contextHolder] = Modal.useModal();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const canManage = (artikel) =>
    role === "admin" || artikel.penulis?.id === currentUser?.id;

  useEffect(() => {
    if(Array.isArray(artikels) &&
    artikels.length === 0 && page > 1
  ) {
    setPage(page - 1)
  }
    fetchArtikel(page, pageSize);
  }, [fetchArtikel, page, pageSize]);

  const handleDelete = (id) => {
    modal.confirm({
      title: "Hapus Artikel",
      content: "Apakah kamu yakin ingin menghapus artikel ini?",
      okText: "Hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk: async () => {
        await deleteArtikel(id);
        message.success("Artikel berhasil dihapus");
        fetchArtikel();
      },
    });
  };

  const handleView = (artikel) => {
    setSelectedArtikel(artikel);
    setOpenView(true);
  };

  const filteredData = useMemo(() => {
    const list = Array.isArray(artikels)
    ? artikels
    : artikels?.results || [];

    const s = (searchText || "").toLowerCase();

    return list.filter((a) => {
      const kategoriNama = a.kategori?.nama || "";
      const tagNamaList =  Array.isArray(a.tags) 
      ? a.tags.map((t) => t.nama)
      : [];
      const matchesSearch = s === "" || judul.incLudes(s);

      const matchesKategori = selectedKategori.length === 0 ||
      selectedKategori.includes(kategoriNama);
      const matchesTags = selectedTag.length === 0 || tagNamaList.some((t) => selectedTag.includes(t));

      return matchesSearch && matchesKategori && matchesTags;
    });
  }, [artikels, searchText, selectedKategori, selectedTag]);

  const myArtikel = (filteredData ?? []).filter(
    (a) => a.penulis?.id === currentUser?.id
  );
  const publicArtikel = (filteredData ?? []).filter(
    (a) => a.status === "published"
  );

  const columns = [
    {
      title: "Judul",
      dataIndex: "judul",
      width: "30%",
    },
    {
      title: "Penulis",
      dataIndex: ["penulis", "username"],
      width: "20%",
      render: (text) => text || "-",
    },
    {
      title: "Aksi",
      width: "30%",
      render: (a) => (
        <Space>
          <Button size="small" onClick={() => handleView(a)}>
            View
          </Button>
          {canManage(a) && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  navigate("/artikel/create");
                  useArtikelStore.getState().setSelected(a);
                }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Hapus artikel ini?"
                onConfirm={() => handleDelete(a.id)}
              >
                <Button danger size="small">
                  Hapus
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
      <Card
        title="Dashboard Artikel"
        extra={
          <Button type="primary" onClick={() => navigate("/artikel/create")}>
            + Buat Artikel
          </Button>
        }
      >
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} md={8}>
            <Search
              placeholder="Search...."
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Filter kategori"
              value={selectedKategori}
              onChange={setSelectedKategori}
              options={(kategoriList ?? []).map((k) => ({
                label: k.nama,
                value: k.nama,
              }))}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Filter tag"
              value={selectedTag}
              onChange={setSelectedTag}
              options={(tagList ?? []).map((t) => ({
                label: t.nama,
                value: t.nama,
              }))}
            />
          </Col>
        </Row>

        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "My Artikel",
              children: (
                <Table
                  dataSource={myArtikel}
                  columns={columns}
                  rowKey="id"
                  pagination= {{
                    pageSize: 10,
                    current: page,
                    total: artikels?.count || myArtikel.length, onChange: (p) => setPage(p),
                  }}
                  style={{ borderRadius: 8, overflow: "hidden" }}
                />
              ),
            },
            role === "admin"
              ? {
                  key: "2",
                  label: "Artikel Publik",
                  children: (
                    <Table
                      dataSource={publicArtikel}
                      columns={columns}
                      rowKey="id"
                      pagination={{
                        pageSize: 10,
                        current: page,
                        total: artikels?.count || publicArtikel.length, onChange: (p) => setPage(p),
                      }}
                      style={{ borderRadius: 8, overflow: "hidden" }}
                    />
                  ),
                }
              : null,
          ].filter(Boolean)}
        />
      </Card>

      <Modal
        title="Detail Artikel"
        open={openView}
        onCancel={() => setOpenView(false)}
        footer={[
          <Button key="close" onClick={() => setOpenView(false)}>
            Tutup
          </Button>,
        ]}
        width={700}
        Style={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {selectedArtikel && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <strong>Judul:</strong>
              <div>{selectedArtikel.judul}</div>
            </div>
            <div>
              <strong>Konten:</strong>
              <div
                style={{
                  whiteSpace: "pre-line",
                  maxHeight: 250,
                  overflowY: "auto",
                  background: "#fafafa",
                  padding: "8px",
                  borderRadius: "6px",
                }}
              >
                {selectedArtikel.konten}
              </div>
            </div>
            <div>
              <strong>Penulis:</strong>
              <div>{selectedArtikel.penulis?.username || "-"}</div>
            </div>
            <div>
              <strong>Kategori:</strong>
              <div>{selectedArtikel.kategori?.nama || "-"}</div>
            </div>
            <div>
              <strong>Tag:</strong>
              <div>
                {selectedArtikel.tags?.length
                  ? selectedArtikel.tags.map((t) => t.nama).join(", ")
                  : "-"}
              </div>
            </div>
            <div>
              <strong>Status:</strong>
              <div>{selectedArtikel.status || "-"}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
