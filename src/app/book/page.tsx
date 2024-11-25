"use client";

import { useEffect, useState } from "react";
import { fetchBooks, deleteBook, editBook } from "@/services/apiBook";

const BookPage = () => {
  const [books, setBooks] = useState<any[]>([]); 
  const [editingBook, setEditingBook] = useState<any | null>(null);

  // Função para carregar os livros
  const loadBooks = async () => {
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    }
  };

  // Função para apagar um livro com confirmação
  const handleDeleteBook = async (id: number) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja apagar este livro?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      alert("Livro apagado com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar livro:", error);
      alert("Erro ao apagar livro.");
    }
  };

  // Função para salvar edições
  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editBook(editingBook.id, editingBook);
      alert("Livro editado com sucesso!");
      setEditingBook(null);
      loadBooks();
    } catch (error) {
      console.error("Erro ao editar livro:", error);
      alert("Erro ao editar livro.");
    }
  };

  // Carregar livros ao montar o componente
  useEffect(() => {
  loadBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Livros</h2>

      {/* Renderização da lista de livros */}
      <ul className="space-y-5">
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="p-2 border border-gray-200 rounded">
              <strong>ID:</strong> {book.id} <br />
              <strong>Título:</strong> {book.title} <br />
              <strong>Descrição:</strong> {book.descricao} <br />
              <strong>Autor:</strong> {book.autor} <br />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setEditingBook(book)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Apagar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>Não há livros cadastrados.</li>
        )}
      </ul>

      {/* Renderização do formulário de edição */}
      {editingBook && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-black text-lg font-bold mb-4">Editar Livro</h3>
            <form onSubmit={saveEdit}>
              <div className="mb-4 text-black">
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
                  Título do Livro
                </label>
                <input
                  type="text"
                  id="edit-title"
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
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
                  value={editingBook.descricao}
                  onChange={(e) => setEditingBook({ ...editingBook, descricao: e.target.value })}
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
                  value={editingBook.autor}
                  onChange={(e) => setEditingBook({ ...editingBook, autor: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setEditingBook(null)}
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

export default BookPage;
