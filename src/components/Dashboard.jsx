// import ArtikelForm from "./ArtikelForm";
import ArtikelList from "./ArtikelList";
import KategoriTags from "./KategoriTags";

export default function Dashboard({
  artikelSaya,
  artikelPublik,
  kategori,
  tags,
  artikelEdit,
  onSaveArtikel,
  onCancelEdit,
  onEditArtikel,
  onDeleteArtikel,
  onCreateKategori,
  onUpdateKategori,
  onDeleteKategori,
  onCreateTag,
  onUpdateTag,
  onDeleteTag,
}) {
  return (
    <div className="space-y-6">
      {/* <ArtikelForm
        kategori={kategori}
        tags={tags}
        onSubmit={onSaveArtikel}
        artikelEdit={artikelEdit}
        onCancel={onCancelEdit}
      /> */}

      <ArtikelList
        artikel={artikelSaya}
        onEdit={onEditArtikel}
        onDelete={onDeleteArtikel}
        isMyList
      />

      <ArtikelList artikel={artikelPublik} isMyList={false} />

      <KategoriTags
        kategori={kategori}
        tags={tags}
        onCreateKategori={onCreateKategori}
        onUpdateKategori={onUpdateKategori}
        onDeleteKategori={onDeleteKategori}
        onCreateTag={onCreateTag}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </div>
  );
}