import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { Button, Modal, Popconfirm, List, Typography, Tag, Space, theme, Empty } from "antd"

const { Paragraph, Text } = Typography

export default function ArtikelList({ artikel = [], onDelete, isMyList = false }) {
  const { user } = useAuthStore()
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()
  const { token } = theme.useToken()

  const canModify = useCallback(
    (a) => user?.role === "admin" || a.penulis?.id === user?.id,
    [user]
  )

  const showDetail = useCallback(
    (a) => {
      modal.info({
        title: a.judul,
        width: 600,
        centered: true,
        content: (
          <div style={{ maxHeight: "70vh", overflowY: "auto", color: token.colorText }}>
            <Paragraph>{a.konten}</Paragraph>

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
                <Text strong>Penulis:</Text> {a.penulis?.username || "-"}
              </p>
              <p>
                <Text strong>Kategori:</Text> {a.kategori?.nama || "-"}
              </p>
              <p>
                <Text strong>Tags:</Text>{" "}
                {a.tags?.length
                  ? a.tags.map((t) => <Tag key={t.id}>{t.nama}</Tag>)
                  : "-"}
              </p>
              <p>
                <Text strong>Status:</Text> {a.status}
              </p>
            </div>
          </div>
        ),
        okText: "Tutup",
      })
    },
    [modal, token]
  )

  if (!artikel?.length) {
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
          description={isMyList ? "Belum ada artikel Anda." : "Belum ada artikel publik."}
        />
      </div>
    )
  }

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
        pagination={false}
        renderItem={(a) => (
          <List.Item
            key={a.id}
            style={{
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = token.colorFillTertiary)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            actions={[
              <Button type="primary" onClick={() => showDetail(a)} key="view">
                View
              </Button>,
              canModify(a) && (
                <Button key="edit" onClick={() => navigate(`/create-artikel/${a.id}`)}>
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
                  <Button danger>Hapus</Button>
                </Popconfirm>
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              title={
                <Space direction="vertical" size={0}>
                  <Text strong style={{ color: token.colorText }}>{a.judul}</Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {isMyList
                      ? `Status: ${a.status}`
                      : `Penulis: ${a.penulis?.username || "-"}`}
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