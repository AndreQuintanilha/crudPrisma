"use client";

import { useState } from "react";
import { cadastrarBook } from "@/services/cadApiBook";

export default function CadastrarBook() {
  // Estados para armazenar os dados do formulário
  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");
  const [autor, setAutor] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o recarregamento da página
    try {
      // Envia os dados para o backend usando a função de serviço
      await cadastrarBook({ title, descricao, autor });

      // Limpa os campos após o envio
      setTitle("");
      setDescricao("");
      setAutor("");

      alert("Livro cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar livro.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Cadastro de Livro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-black">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título do Livro
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Atualiza o estado
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o título do livro"
              required
            />
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="descricao"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)} // Atualiza o estado
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite a descrição"
              required
            ></textarea>
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="autor" className="block text-sm font-medium text-gray-700">
              Autor
            </label>
            <input
              type="text"
              id="autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)} // Atualiza o estado
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o Autor"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
