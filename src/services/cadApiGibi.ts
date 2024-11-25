import axios from "axios";

// Função para cadastrar um novo gibi
export const cadastrarGibi = async (gibiData: { title: string; descricao: string; autor: string }) => {
  const API_URL = "http://localhost:3000/gibi";
  try {
    const response = await axios.post(API_URL, gibiData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar gibi:", error);
    throw error;
  }
};
