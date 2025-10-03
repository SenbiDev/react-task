import { useAuthStore } from "../store/useAuthStore"
import { Button, Modal, Popconfirm } from "antd"
import { useNavigate } from "react-router-dom"

export default function ArtikelList({ artikel = [], onDelete, isMyList = false }) {
  const { user } = useAuthStore()
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()

  // 🔹 Cek apakah user boleh edit/hapus
  const canModify = (a) => user?.role === "admin" || a.penulis?.id === user?.id

  // 🔹 Modal detail artikel
  const showDetail = (a) => {
    modal.info({
      title: a.judul,
      content: (
        <div>
          <p>{a.konten}</p>
          <p className="text-sm text-gray-500 mt-2">
            Penulis: {a.penulis?.username || "-"} | Kategori:{" "}
            {a.kategori?.nama || "-"} | Tags:{" "}
            {a.tags?.map((t) => t.nama).join(", ") || "-"}
          </p>
        </div>
      ),
      okText: "Tutup",
    })
  }

  return (
    <div className="bg-gray-900 text-white p-0 pt-0 rounded-lg shadow-md mt-3">
      {contextHolder}

      <h3 className="text-lg font-semibold mb-3">
        {/* {isMyList ? "Artikel Saya" : "Artikel Publik"} */}
      </h3>

      {artikel.length === 0 ? (
        <p className="text-gray-400">
          {isMyList ? "Belum ada artikel." : "Belum ada artikel publik."}
        </p>
      ) : (
        <ul className="space-y-2">
          {artikel.map((a) => (
            <li
              key={a.id}
              className="p-3 rounded bg-gray-800 border border-gray-700 flex justify-between items-center"
            >
              {/* Info Artikel */}
              <div className="flex-1">
                <h4 className="font-bold">{a.judul}</h4>
                <p className="text-sm text-gray-400">
                  {isMyList ? (
                    <>Status: {a.status}</>
                  ) : (
                    <>Penulis: {a.penulis?.username || "-"}</>
                  )}
                </p>
              </div>

              {/* Aksi */}
              <div className="flex gap-2 ml-4">
                <Button type="primary" onClick={() => showDetail(a)}>
                  View
                </Button>

                {canModify(a) && (
                  <>
                    <Button
                      type="default"
                      onClick={() => navigate(`/create-artikel/${a.id}`)}
                    >
                      Edit
                    </Button>

                    <Popconfirm
                      title="Yakin hapus artikel ini?"
                      okText="Ya"
                      cancelText="Batal"
                      onConfirm={() => onDelete?.(a.id)}
                    >
                      <Button danger>Hapus</Button>
                    </Popconfirm>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}