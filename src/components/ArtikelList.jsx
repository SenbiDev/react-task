import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Button, Modal, Popconfirm, List, Typography, Tag, Space } from "antd";

const { Paragraph, Text } = Typography;

export default function ArtikelList({ artikel = [], onDelete, isMyList = false }) {
  const { user } = useAuthStore();
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const canModify = useCallback(
    (a) => user?.role === "admin" || a.penulis?.id === user?.id,
    [user]
  );

  const showDetail = useCallback(
    (a) => {
      modal.info({
        title: a.judul,
        width: 600,
        content: (
          <div className="max-h-[70vh] overflow-y-auto text-gray-200">
            <Paragraph className="text-gray-300">{a.konten}</Paragraph>

            <div className="mt-3 border-t border-gray-700 pt-2 text-sm text-gray-400">
              <p>
                <Text strong className="text-gray-300">Penulis:</Text> {a.penulis?.username || "-"}
              </p>
              <p>
                <Text strong className="text-gray-300">Kategori:</Text> {a.kategori?.nama || "-"}
              </p>
              <p>
                <Text strong className="text-gray-300">Tags:</Text>{" "}
                {a.tags?.length
                  ? a.tags.map((t) => <Tag key={t.id}>{t.nama}</Tag>)
                  : "-"}
              </p>
              <p>
                <Text strong className="text-gray-300">Status:</Text> {a.status}
              </p>
            </div>
          </div>
        ),
        okText: "Tutup",
      });
    },
    [modal]
  );

  if (artikel.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 bg-gray-900 rounded-lg shadow-md">
        {contextHolder}
        {isMyList ? "Belum ada artikel." : "Belum ada artikel publik."}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-0">
      {contextHolder}
      <List
        itemLayout="horizontal"
        dataSource={artikel}
        className="!text-white"
        pagination={false}
        renderItem={(a) => (
          <List.Item
            key={a.id}
            className="!border-b !border-gray-800 hover:!bg-gray-800 transition-all"
            actions={[
              <Button type="primary" onClick={() => showDetail(a)} key="view">
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
                  <Button danger>Hapus</Button>
                </Popconfirm>
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              title={
                <Space direction="vertical" size={0}>
                  <Text strong className="!text-white">
                    {a.judul}
                  </Text>
                  <Text className="text-gray-400 text-sm">
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
  );
}