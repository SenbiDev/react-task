import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import {
  Button,
  Modal,
  Popconfirm,
  List,
  Typography,
  Tag,
  Space,
  theme,
  Empty,
} from "antd"

const { Paragraph, Text } = Typography

export default function ArtikelList({ artikel = [], onDelete, isMyList = false }) {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [modal, contextHolder] = Modal.useModal()
  const { token } = theme.useToken()

  // ✅ konsisten: pastikan validasi role dan owner
  const canModify = useCallback(
    (a) =>
      user?.role === "admin" ||
      a?.penulis?.id === user?.id ||
      a?.penulis_id === user?.id ||
      a?.is_owner,
    [user]
  )

  // ✅ tampilan detail artikel
  const showDetail = useCallback(
    (a) => {
      modal.info({
        title: a?.judul || "Tanpa Judul",
        width: 600,
        centered: true,
        okText: "Tutup",
        content: (
          <div
            style={{
              maxHeight: "70vh",
              overflowY: "auto",
              color: token.colorText,
            }}
          >
            <Paragraph>{a?.konten || "Tidak ada konten."}</Paragraph>

            <div
              style={{
                marginTop: 12,
                borderTop: `1px solid ${token.colorBorderSecondary}`,
                paddingTop: 8,
                fontSize: 13,
                color: token.colorTextSecondary,
              }}
            >
              <p>
                <Text strong>Penulis:</Text> {a?.penulis?.username || "-"}
              </p>
              <p>
                <Text strong>Kategori:</Text> {a?.kategori?.nama || "-"}
              </p>
              <p>
                <Text strong>Tags:</Text>{" "}
                {Array.isArray(a?.tags) && a.tags.length > 0
                  ? a.tags.map((t) => (
                      <Tag key={t.id} color="blue">
                        {t.nama}
                      </Tag>
                    ))
                  : "-"}
              </p>
              <p>
                <Text strong>Status:</Text>{" "}
                <Tag
                  color={a?.status === "published" ? "green" : "default"}
                  style={{ marginLeft: 4 }}
                >
                  {a?.status || "-"}
                </Tag>
              </p>
            </div>
          </div>
        ),
      })
    },
    [modal, token]
  )

  // ✅ tampilkan state kosong dengan gaya seragam
  if (!Array.isArray(artikel) || artikel.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem 0",
          background: token.colorBgContainer,
          borderRadius: 8,
          color: token.colorTextSecondary,
          boxShadow: token.boxShadowTertiary,
        }}
      >
        {contextHolder}
        <Empty
          description={
            isMyList ? "Belum ada artikel Anda." : "Belum ada artikel publik."
          }
        />
      </div>
    )
  }

  // ✅ daftar artikel
  return (
    <div
      style={{
        background: token.colorBgContainer,
        borderRadius: 8,
        boxShadow: token.boxShadowTertiary,
      }}
    >
      {contextHolder}
      <List
        itemLayout="horizontal"
        dataSource={artikel}
        renderItem={(a) => (
          <List.Item
            key={a?.id}
            style={{
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = token.colorFillTertiary)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            actions={[
              <Button key="view" type="primary" onClick={() => showDetail(a)}>
                View
              </Button>,
              canModify(a) && (
                <Button
                  key="edit"
                  onClick={() => navigate(`/create-artikel/${a.id}`)}
                >
                  Edit
                </Button>
              ),
              canModify(a) && (
                <Popconfirm
                  key="delete"
                  title="Yakin hapus artikel ini?"
                  okText="Ya"
                  cancelText="Batal"
                  onConfirm={() => onDelete?.(a.id)}
                >
                  <Button
                    danger
                    type="primary"
                    style={{
                      background: token.colorError,
                      borderColor: token.colorError,
                      color: token.colorTextLightSolid,
                    }}
                  >
                    Hapus
                  </Button>
                </Popconfirm>
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              title={
                <Space direction="vertical" size={0}>
                  <Text strong style={{ color: token.colorText }}>
                    {a?.judul || "Tanpa Judul"}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {isMyList
                      ? `Status: ${a?.status || "-"}`
                      : `Penulis: ${a?.penulis?.username || "-"}`}
                  </Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}