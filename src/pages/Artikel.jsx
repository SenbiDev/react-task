import React, { createContext, useState } from "react";
import * as artikel from "../hooks/artikel";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import { useArtikelStore } from "../store/useArtikelStore";
import { EyeIcon, FileText, PencilIcon, Trash2Icon, User } from "lucide-react";
import { message, Button, Popconfirm, Modal, Tabs, Card, Input, Select } from "antd";

const {Search} = Input;

export default function ArtikelPage() {
  const deleteArt = useArtikelStore((state) => state.deleteArt)
  const startEdit = useArtikelStore((state) => state.startEdit)

  const {user} = useAuth();
  const role = user?.role || "";
  const navigate = useNavigate();

  const { data: kategoriList = [], isLoading: kategoriLoading } = admin.useKategori();
  const { data: tagList = [], isLoading: tagLoading } = admin.useTags();
  const { data: myArtikel = [] } = artikel.useMyArtikels();
  const { data: publikArtikel = [] } = artikel.usePublikArtikels(role === "admin");
  const deleteArtikel = artikel.useDeleteArtikel();

  const [query, setQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedTags, setSelectedTags] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const filteredSaya = myArtikel.filter((artikel) =>
    artikel?.judul.toLowerCase().includes(query.toLowerCase()) &&
    (selectedKategori ? artikel.kategori?.id === selectedKategori : true)&&
    (selectedTags.length > 0 ? selectedTags.every((t) => artikel.tags.map((tg) => tg.id).includes(t)) : true)
  );

  const filteredPublik = publikArtikel.filter((artikel) =>
    artikel?.judul.toLowerCase().includes(query.toLowerCase())
    (selectedKategori ? artikel.kategori?.id === selectedKategori : true)&&
    (selectedTags.length > 0 ? selectedTags.every((t) => artikel.tags.map((tg) => tg.id).includes(t)) : true)
  );


  const artikelSaya = (
                  <Card className="bg-gray-800 p-6 border border-gray-300 rounded shadow-sm">
                    <h3 className="mb-4 text-lg text-gray-900 font-medium">Artikel Saya</h3>
                    {filteredSaya.length === 0 ? (
                        <p className="text-gray-500">Belum ada artikel</p>
                    ) : (
                        <ul className="space-y-3">
                            {filteredSaya.map((artikel) => (
                                <li key={artikel.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                    <div>
                                        <p className="font-medium text-gray-900">{artikel.judul}</p>
                                        <p className="text-sm text-gray-900">{artikel.status}</p>
                                    </div>
                                    <div className="flex justify-around space-x-2">
                                      <Button
                                        type="text"
                                        className="text-blue-600 hover:underline text-sm"
                                        onClick={() => viewArt(artikel)}
                                      >
                                        <EyeIcon className="text-blue-600"/>
                                      </Button>
                                      <div className="space-x-2">
                                          <Button
                                            type="text"
                                            onClick={() => handleEdit(artikel)}
                                          >
                                            <PencilIcon className="text-green-600"/>
                                          </Button>
                                          <Popconfirm
                                            title="Yakin hapus artikel ini?"
                                            description="artikel yang telah dihapus tidak dapat dipulihkan"
                                            onConfirm={() => handleDelete(artikel.id)}
                                            okText="Ya"
                                            cancelText="Tidak"

                                          >
                                            <Button type="text">
                                              <Trash2Icon className="text-red-600"/>
                                            </Button>
                                          </Popconfirm>
                                      </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
  );

  const artikelPublik = (
                <Card className="bg-gray-800 p-6 border border-gray-300 rounded shadow-sm">
                  <h3 className="mb-4 text-lg text-gray-900 font-medium">Artikel Publik</h3>
                    {filteredPublik.length === 0 ? (
                      <p className="text-gray-500">Belum ada artikel publik.</p>
                    ) : (
                      <ul className="space-y-3">
                        {filteredPublik.map((artikel) => {
                          const user = JSON.parse(localStorage.getItem("user"));
                          const isOwner = user?.id === artikel.penulis?.id;
                          const isAdmin = user?.role === "admin";
                          return (
                            <li key={artikel.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                          <div>
                            <p className="font-medium text-gray-900">{artikel.judul}</p>
                            <p className="text-sm text-gray-900 mt-1">
                              Penulis: {artikel.penulis?.username || "-"} | Kategori:{" "}
                              {artikel.kategori?.nama || "-"} | Tags:{" "}
                              {artikel.tags?.map((t) => t.nama).join(", ") || "-"}
                            </p>
                          </div>
                          <div className="flex justify-around space-x-2">
                                <Button
                                  type="text"
                                  className="text-blue-600 hover:underline text-sm"
                                  onClick={() => viewArt(artikel)}
                                >
                                  <EyeIcon className="text-blue-600"/>
                                </Button>
                                <div className="space-x-2">
                                  <Button
                                    type="text"
                                    onClick={() => handleEdit(artikel)}
                                  >
                                    <PencilIcon className="text-green-600"/>
                                  </Button>
                                  <Popconfirm
                                    title="Yakin hapus artikel ini?"
                                    description="artikel yang telah dihapus tidak dapat dipulihkan"
                                    onConfirm={() => handleDelete(artikel.id)}
                                    okText="Ya"
                                    cancelText="Tidak"
                                  >
                                    <Button type="text">
                                      <Trash2Icon className="text-red-600"/>
                                    </Button>
                                  </Popconfirm>
                            </div>
                          </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Card>
  );

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2">
          <FileText size={16}/>Artikel Saya
        </span>
      ),
      children: artikelSaya,
    },
  ];

  if (role === "admin") {
    items.push({
      key: "2",
      label: (
        <span className="flex items-center gap-2">
          <User size={16}/> Artikel
        </span>
      ),
      children: artikelPublik
    })
  }

  const viewArt = (artikel) => {
    const config = (a) => ({
      title : a.judul,
      content : (
        <div className="">
          <h3 className="whitespace-pre-line">{a.konten}</h3>
          <br/>
            <div className="flex gap-5 mb-3">
              <div className="flex justify-around gap-2">
                <p className="font-semibold text-gray-400">
                  Kategori :
                </p>
                <p className="font-bold text-gray-900">
                  {""}{artikel.kategori?.nama||"-"}
                </p>
              </div>
              <div className="flex justify-around gap-2">
                <p className="font-semibold text-gray-400">
                  Tag : 
                </p>
                <p className="font-bold text-gray-900 items-center">
                  #{artikel.tags?.map((t) => t.nama).join(" #")||"-"}
                </p>
              </div>
            </div>
            <div className="flex justify-baseline gap-2">
              <p className="font-semibold text-gray-400">
                Penulis :
              </p>
              <p className="font-bold text-gray-900 mb-4">
                {artikel.penulis?.username||"-"}
              </p>
            </div>
        </div>
      ),
      okText: "Tutup",
      icon: null
    });
    Modal.info(config(artikel));
  };

  const handleEdit = (artikel) => {
    startEdit(artikel);
    navigate("/create")
  };

  const handleDelete = (id) => {
      deleteArtikel.mutate(id);
      deleteArt(id);
  }

  const infoDelete = () => {
    messageApi.success("Artikel berhasil dihapus")
  }
  
  return (
      <>
        {contextHolder}
        <div className="min-h-screen bg-gray-900 font-sans p-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <h1 className="text-xl font-semibold text-white">Selamat datang</h1>
              <div className="space-x-2">
                <span
                  onClick={() => navigate("/create")}
                  className="flex gap-2 bg-gray-800 text-blue-700 font-semibold px-3 py-1.5 rounded"
                >
                  <FileText/> Create
                </span>
              </div>
            </div>
            <Card className="bg-gray-800 p-6 border border border-gray-300 rounded shadow-sm">
              <div>
                <Search
                    placeholder="Cari judul artikel"
                    onChange={(e) => setQuery(e.target.value)}
                    allowClear
                    className="w-full max-w-xs"
                  />
                <Select
                  placeholder="Filter Kategori"
                  allowClear
                  value={selectedKategori}
                  onChange={(val) => selectedKategori(val)}
                  className="w-40"
                >
                  {kategoriList.map((k) => (
                    <Option key={k.id} value={k.id}>
                      {k.nama}
                    </Option>
                  ))}
                </Select>
                <Select
                  mode="multiple"
                  placeholder="Filter Tags"
                  allowClear
                  value={selectedTags}
                  onChange={(val) => selectedTags(val)}
                  className="w-60"
                >
                  {tagList.map((t) => (
                    <Option key={t.id} value={t.id}>
                      {t.nama}
                    </Option>
                  ))}
                </Select>
              </div>
              <Tabs defaultActiveKey="1" items={items}/>
            </Card>
          </div>
        </div>
      </>
    );
}