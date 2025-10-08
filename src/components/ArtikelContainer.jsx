import { Card, Pagination, Spin } from "antd";

export default function ArtikelContainer({
  title,
  children,
  loading = false,
  total = 0,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
}) {
  return (
    <Card
      title={<span className="font-semibold text-lg">{title}</span>}
      variant="borderless"
      className="mb-4 bg-gray-900 text-white"
      styles={{
        header: {
          background: "#1f2937",
          color: "#fff",
          borderBottom: "1px solid #374151",
        },
        body: {
          background: "#111827",
        },
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin spinning tip="Memuat artikel..." />
        </div>
      ) : (
        <>
          {children}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {/* <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={onPageChange}
              showSizeChanger={false}
              style={{ color: "white" }}
            /> */}
          </div>
        </>
      )}
    </Card>
  );
}