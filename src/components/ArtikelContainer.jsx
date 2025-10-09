import { Card, Spin, theme, Typography } from "antd"

const { Text } = Typography

export default function ArtikelContainer({
  title,
  children,
  loading = false,
}) {
  const { token } = theme.useToken()

  return (
    <Card
      title={
        <Text
          strong
          style={{
            fontSize: 16,
            color: token.colorTextHeading,
          }}
        >
          {title || "Daftar Artikel"}
        </Text>
      }
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
      bodyStyle={{
        padding: "1.5rem",
        background: token.colorBgContainer,
      }}
    >
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 0",
            color: token.colorTextSecondary,
          }}
        >
          <Spin
            tip="Memuat artikel..."
            size="large"
            style={{ color: token.colorPrimary }}
          />
        </div>
      ) : (
        children
      )}
    </Card>
  )
}