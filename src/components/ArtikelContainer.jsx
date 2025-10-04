import { Card } from "antd"

export default function ArtikelContainer({ title, children }) {
  return (
    <Card
      title={<span className="font-semibold text-lg">{title}</span>}
      bordered={false}
      className="mb-4 bg-gray-900 text-white"
      headStyle={{
        background: "#1f2937", 
        color: "#fff",
      }}
      bodyStyle={{
        background: "#111827", 
      }}
    >
      {children}
    </Card>
  )
}