import { Card, Spin, theme } from "antd"

export default function ArtikelContainer({
  title,
  children,
  loading = false,
}) {
  const { token } = theme.useToken()

  return (
    <Card
      title={<span style={{ fontWeight: 600, fontSize: 16, color: token.colorText }}>{title}</span>}
      bordered={false}
      style={{
        background: token.colorBgContainer,
        color: token.colorText,
        borderRadius: 12,
        marginBottom: 24,
        boxShadow: token.boxShadowTertiary,
      }}
      headStyle={{
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        background: token.colorBgElevated,
      }}
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <Spin tip="Memuat artikel..." />
        </div>
      ) : (
        children
      )}
    </Card>
  )
}