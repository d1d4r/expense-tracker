import axios from "axios";

export const getCategories = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/categories");
    return data;
  } catch (error) {
    throw error;
    console.log("🚀 ~ getCategories ~ error:", error);
  }
};
