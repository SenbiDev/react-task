import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles, useDeleteArticle } from "../hooks/useArtikelQuery";
import { useArtikelStore } from "../store/artikelStore";
import {
  Card,
  Tabs,
  Button,
  Table,
  Space,
  Popconfirm,
  message,
  Modal,
  Descriptions,
} from "antd";

export default function ArtikelPage() {
  const navigate = useNavigate();
  const { setSelected } = useArtikelStore();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const role = currentUser?.role || "user";

  // Query data artikel
  const { data: artikels = [], isLoading } = useArticles();
  const { mutate: deleteArticle } = useDeleteArticle();

  // Pisahkan artikel berdasarkan penulis & status
  const myArtikel = artikels.filter((a) => a.penulis?.id === currentUser?.id);
  const publicArtikel = artikels.filter((a) => a.status === "published");

  const canManage = (artikel) =>
    role === "admin" || artikel.penulis?.id === currentUser?.id;

  // Fungsi hapus artikel
  const handleDelete = (id) => {
    deleteArticle(id, {
      onSuccess: () => message.success("Artikel berhasil dihapus"),
    });
  };

  // === Modal View ===
  const [openView, setOpenView] = useState(false);
  const [selectedArtikel, setSelectedArtikel] = useState(null);

  const handleView = (artikel) => {
    setSelectedArtikel(artikel);
    setOpenView(true);
  };

  // === Kolom Table ===
  const columns = [
    { title: "Judul", dataIndex: "judul" },
    { title: "Penulis", render: (a) => a.penulis?.username || "-" },
    {
      title: "Aksi",
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
                  setSelected(a);
                  navigate("/artikel/create");
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
      <Card
        title="Dashboard Artikel"
        extra={
          <Button type="primary" onClick={() => navigate("/artikel/create")}>
            + Buat Artikel
          </Button>
        }
      >
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
                  loading={isLoading}
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
                      loading={isLoading}
                    />
                  ),
                }
              : null,
          ].filter(Boolean)}
        />
      </Card>

      {/* === Modal View Detail Artikel === */}
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
      >
        {selectedArtikel && (
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Judul">
              {selectedArtikel.judul}
            </Descriptions.Item>
            <Descriptions.Item label="Konten">
              <div
                style={{
                  whiteSpace: "pre-line",
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {selectedArtikel.konten}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Penulis">
              {selectedArtikel.penulis?.username}
            </Descriptions.Item>
            <Descriptions.Item label="Kategori">
              {selectedArtikel.kategori?.nama}
            </Descriptions.Item>
            <Descriptions.Item label="Tag">
              {selectedArtikel.tags?.map((t) => t.nama).join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedArtikel.status}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}
