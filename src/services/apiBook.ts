import axios from "axios";

const BASE_URL = "http://localhost:3000/book";

// Função para buscar livros
export const fetchBooks = async () => {
  const response = await axios.get(BASE_URL, { withCredentials: true });
  return response.data;
};

// Função para apagar um livro
export const deleteBook = async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
};

// Função para editar um livro
export const editBook = async (id: number, bookData: any) => {
  await axios.put(`${BASE_URL}/${id}`, bookData, { withCredentials: true });
};