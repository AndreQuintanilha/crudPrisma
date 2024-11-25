"use client";

import { useEffect, useState } from "react";
import { fetchGibis, deleteGibi, editGibi } from "@/services/apiGibi";

const GibiPage = () => {
  const [gibis, setGibis] = useState<any[]>([]); // Estado para os gibis
  const [editingGibi, setEditingGibi] = useState<any | null>(null); // Estado para o gibi em edição

  // Função para buscar os gibis
  const loadGibis = async () => {
    try {
      const data = await fetchGibis();
      setGibis(data);
    } catch (error) {
      console.error("Erro ao carregar gibis:", error);
    }
  };

  // Função para apagar um gibi com confirmação
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja apagar este gibi?");
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteGibi(id);
      setGibis((prev) => prev.filter((gibi) => gibi.id !== id));
      alert("Gibi apagado com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar gibi:", error);
      alert("Erro ao apagar gibi.");
    }
  };

  // Função para salvar as edições
  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editGibi(editingGibi.id, editingGibi);
      alert("Gibi editado com sucesso!");
      setEditingGibi(null); // Fecha o formulário de edição
      loadGibis(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao editar gibi:", error);
      alert("Erro ao editar gibi.");
    }
  };

  // Atualiza os gibis quando o componente é montado
  useEffect(() => {
    loadGibis();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Gibis</h2>

      {/* Lista de gibis */}
      <ul className="space-y-5">
        {gibis.length > 0 ? (
          gibis.map((gibi) => (
            <li key={gibi.id} className="p-2 border border-gray-200 rounded">
              <strong>ID:</strong> {gibi.id} <br />
              <strong>Título:</strong> {gibi.title} <br />
              <strong>Descrição:</strong> {gibi.descricao} <br />
              <strong>Autor:</strong> {gibi.autor} <br />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setEditingGibi(gibi)} // Define o gibi em edição
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(gibi.id)} // Apaga o gibi com confirmação
                >
                  Apagar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>Não há gibis cadastrados.</li>
        )}
      </ul>

      {/* Janela de Edição */}
      {editingGibi && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-black text-lg font-bold mb-4">Editar Gibi</h3>
            <form onSubmit={saveEdit}>
              <div className="mb-4 text-black">
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
                  Título do Gibi
                </label>
                <input
                  type="text"
                  id="edit-title"
                  value={editingGibi.title}
                  onChange={(e) => setEditingGibi({ ...editingGibi, title: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4 text-black">
                <label htmlFor="edit-descricao" className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  id="edit-descricao"
                  rows={4}
                  value={editingGibi.descricao}
                  onChange={(e) => setEditingGibi({ ...editingGibi, descricao: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div className="mb-4 text-black">
                <label htmlFor="edit-autor" className="block text-sm font-medium text-gray-700">
                  Autor
                </label>
                <input
                  type="text"
                  id="edit-autor"
                  value={editingGibi.autor}
                  onChange={(e) => setEditingGibi({ ...editingGibi, autor: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setEditingGibi(null)} // Fecha o formulário de edição
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GibiPage;
