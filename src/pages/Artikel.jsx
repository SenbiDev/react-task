import React, { createContext, useEffect, useState } from "react";
import * as artikel from "../hooks/artikel";
import * as admin from "../hooks/admin";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import { useArtikelStore } from "../store/useArtikelStore";
import { EyeIcon, FileText, PencilIcon, Trash2Icon, User } from "lucide-react";
import { message, Button, Popconfirm, Modal, Tabs, Card, Input, Select, Pagination } from "antd";

const {Search} = Input;
const {Option} = Select;

export default function ArtikelPage() {
  const deleteArt = useArtikelStore((state) => state.deleteArt)
  const startEdit = useArtikelStore((state) => state.startEdit)

  const {user} = useAuth();
  const role = user?.role || "";
  const navigate = useNavigate();

  const { data: kategoriList = [] } = admin.useKategori();
  const { data: tagList = [] } = admin.useTags();
  const { data: myArtikelData, refetch: refetchMyArtikel, isFetching : isFetchingMyArtikel } = artikel.useAllMyArtikels(10);
  const { data: publikArtikelData, refetch: refetchPublikArtikel, isFetching : isFetchingPublikArtikel } = artikel.useAllPublikArtikels(10, role === "admin");
  const myArtikelRaw = Array.isArray(myArtikelData)
  ? myArtikelData
  : myArtikelData?.results||[];
  const publikArtikelRaw = Array.isArray(publikArtikelData)
  ? publikArtikelData
  : publikArtikelData?.results||[];
  
  const myArtikel = Array.from (new Map(myArtikelRaw.map(a=>[a.id, a])).values());
  const publikArtikel = Array.from (new Map(publikArtikelRaw.map(a=>[a.id, a])).values());
  
  const deleteArtikel = artikel.useDeleteArtikel();

  const [query, setQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const filteredSaya = myArtikel.filter((artikel) =>{
    const matchSearch = query
      ?artikel.judul.toLowerCase().includes(query.toLowerCase()) : true;
      const matchKategori = selectedKategori?artikel.kategori?.id === selectedKategori: true;
      const matchTags = selectedTags.length > 0 ? selectedTags.every((tag) => artikel.tags.map((t) => t.id).includes(tag)) : true;
    return matchSearch && matchKategori && matchTags;
  });

  const filteredPublik = publikArtikel.filter((artikel) => {
    const matchSearch = query
      ?artikel.judul.toLowerCase().includes(query.toLowerCase()) : true;
      const matchKategori = selectedKategori?artikel.kategori?.id === selectedKategori: true;
      const matchTags = selectedTags.length > 0 ? selectedTags.every((tag) => artikel.tags.map((t) => t.id).includes(tag)) : true;
    return matchSearch && matchKategori && matchTags;
  });
    
  const [currentSaya, setCurrentSaya] = useState(1);
  const [currentPublik, setCurrentPublik] = useState(1);
  const [pageSizeSaya, setPageSizeSaya] = useState(10);
  const [pageSizePublik, setPageSizePublik]= useState(10);

  useEffect(() => {
    setCurrentSaya(1);
    setCurrentPublik(1);
  }, [query, selectedKategori, selectedTags])

  const paginatedSaya = filteredSaya.slice(
    (currentSaya - 1) * pageSizeSaya,
    currentSaya * pageSizeSaya
  );

  const paginatedPublik = filteredPublik.slice(
    (currentPublik - 1) * pageSizePublik,
    currentPublik * pageSizePublik
  );
  
  const onChangeSaya = (page, size) => {
    setCurrentSaya(page);
    setPageSizeSaya(size);
  };
  const onChangePublik = (page, size) => {
    console.log(page);
    setCurrentPublik(page)
    setPageSizePublik(size);
  };

  const artikelSaya = (
                  <Card className="bg-gray-800 p-6 border border-gray-300 rounded shadow-sm">
                    <h3 className="mb-4 text-lg font-medium">Artikel Saya</h3>
                    {paginatedSaya.length === 0 ? (
                        <p className="text-gray-500">Belum ada artikel</p>
                    ) : (
                        <ul className="space-y-3">
                            {paginatedSaya.map((artikel, index) => (
                                <li key={`saya-${artikel.id}-${index}`} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                    <div>
                                        <p className="font-medium">{artikel.judul}</p>
                                        <p className="text-sm">{artikel.status}</p>
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
                    <div className="flex justify-center mt-4">
                      <Pagination
                        current={currentSaya}
                        onChange={onChangeSaya}
                        total={filteredSaya.length}
                        pageSize={pageSizeSaya}
                      />
                    </div>
                </Card>
  );

  const artikelPublik = (
                <Card className="bg-gray-800 p-6 border border-gray-300 rounded shadow-sm">
                  <h3 className="mb-4 text-lg text-gray-900 font-medium">Artikel Publik</h3>
                    {paginatedPublik.length === 0 ? (
                      <p className="text-gray-500">Belum ada artikel publik.</p>
                    ) : (
                      <ul className="space-y-3">
                        {paginatedPublik.map((artikel, index) => {
                          const user = JSON.parse(localStorage.getItem("user"));
                          const isOwner = user?.id === artikel.penulis?.id;
                          const isAdmin = user?.role === "admin";
                          return (
                            <li key={`publik-${artikel.id}-${index}`} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                          <div>
                            <p className="font-medium">{artikel.judul}</p>
                            <p className="text-sm mt-1">
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
                  <div className="flex justify-center mt-4">
                    <Pagination
                      current={currentPublik}
                      total={filteredPublik.length}
                      pageSize={pageSizePublik}
                      onChange={onChangePublik}
                    />
                  </div>
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
          <User size={16}/> Artikel Publik
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
                <p className="font-semibold">
                  Kategori :
                </p>
                <p className="font-bold text-gray-900">
                  {""}{artikel.kategori?.nama||"-"}
                </p>
              </div>
              <div className="flex justify-around gap-2">
                <p className="font-semibold">
                  Tag : 
                </p>
                <p className="font-bold items-center">
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
              <Button className="space-x-2">
                <span
                  onClick={() => navigate("/create")}
                  className="flex gap-2 text-blue-700 font-semibold rounded"
                >
                  <FileText/> Create
                </span>
              </Button>
            </div>
            <Card className="bg-gray-800 p-6 border border border-gray-300 rounded shadow-sm">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <Search
                      placeholder="Cari judul artikel"
                      onChange={(e) => setQuery(e.target.value)}
                      allowClear
                      className="w-full max-w-xl"
                  />

                </div>
                <div className="flex flex-col items-end gap-2">
                  <Select
                    placeholder="Filter Kategori"
                    allowClear
                    value={selectedKategori}
                    onChange={(val) => setSelectedKategori(val)}
                    className="w-50"
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
                    onChange={(val) => setSelectedTags(val)}
                    className="w-70"
                  >
                    {tagList.map((t) => (
                      <Option key={t.id} value={t.id}>
                        {t.nama}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <Tabs defaultActiveKey="1" items={items}/>
            </Card>
          </div>
        </div>
      </>
    );
}