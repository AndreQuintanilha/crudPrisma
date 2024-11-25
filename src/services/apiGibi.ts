import axios from "axios";

const API_URL = "http://localhost:3000/gibi";

export const fetchGibis = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

export const deleteGibi = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

export const editGibi = async (id: number, gibiData: any) => {
  await axios.put(`${API_URL}/${id}`, gibiData, { withCredentials: true });
};
