import api from "./index";

export const getAllMenu = async () => {
  const response = await api.get("/menu");
  return response.data;
};

export const getMenuById = async (menuItemId: string) => {
  const response = await api.get(`/menu/${menuItemId}`);
  return response.data;
};

export const getMenuByCategory = async (category: string) => {
  const response = await api.get(`/menu/category/${category}`);
  return response.data;
};