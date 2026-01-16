import axios from "axios";

const categoryService = () => {
    const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/categories`;
    const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

    return {
        getAll: async () => {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        },

        getCategoryCount: async () => {
            const res = await axios.get(API_BASE_URL);
            return res.data.length;
        },

        uploadImage: async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "unsigned_upload");
            
            const response = await axios.post(CLOUDINARY_URL, formData);
            return response.data.secure_url;
        },

        create: async (categoryData) => {
            const response = await axios.post(API_BASE_URL, categoryData);
            return response.data;
        },

        delete: async (categoryId) => {
            const category = await axios.get(`${API_BASE_URL}/${categoryId}`);
            const catProductCount = category.data[0].product_count;
            if (catProductCount > 0) {
                throw new Error("Cannot delete category having products inside.");
            }
            else{
                await axios.delete(`${API_BASE_URL}/${categoryId}`);
            }
        },

        update: async (categoryId, updatedData) => {
            console.log(updatedData);
            const response = await axios.put(`${API_BASE_URL}/${categoryId}`, updatedData);
            return response.data;
        }


    };
};

export default categoryService;