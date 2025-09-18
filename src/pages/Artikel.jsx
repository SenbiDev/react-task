// components/ArtikelList.jsx
import React from "react";
import { useArtikelList } from "../hooks/artikel";

export default function Artikel() {
  const { data: artikels, isLoading, isError, error } = useArtikelList();

  if (isLoading) return <p>Loading artikel...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white h-screen">
      <ul className="p-10">
        {artikels.map((artikel) => (
          <li className="text-black" key={artikel.id}>{artikel.judul}</li>
        ))}
      </ul>
    </div>
  );
}
