import axios from "axios";

// Função para cadastrar um novo livro
export const cadastrarBook = async (bookData: { title: string; descricao: string; autor: string }) => {
  const API_URL = "http://localhost:3000/book";
  try {
    const response = await axios.post(API_URL, bookData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);
    throw error;
  }
};
