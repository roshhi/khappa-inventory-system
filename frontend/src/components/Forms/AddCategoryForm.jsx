import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import categoryServiceFunc from '../../services/categoryService';

const AddCategoryForm = ({ onCategoryAdded, onClose }) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const categoryService = categoryServiceFunc();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert("Please select an image!");
        setLoading(true);

        try {

            const image_secure_url = await categoryService.uploadImage(image);
            
            const newCategory = await categoryService.create({
                name: categoryName,
                description: categoryDesc,
                image: image_secure_url, 
            });

            onCategoryAdded(newCategory);
            onClose();
        } catch (err) {
            console.error("Upload error:", err);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className='font-medium text-sm'>Category Name</label>
            <input 
                type="text" 
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className='bg-white w-full p-3 rounded-xl mt-1 mb-4 border border-gray-200' 
                placeholder='Enter Category Name' 
                required
            />
            
            <label className='font-medium text-sm'>Description</label>
            <textarea 
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
                className='bg-white w-full p-3 resize-none rounded-xl mt-1 mb-4 border border-gray-200' 
                placeholder='Enter Category Description' 
                rows={3}>
            </textarea>

            {preview ? (
                <div className="relative w-20 h-20 mb-4">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl border-2 border-indigo-500" />
                    <button type="button" onClick={() => {setPreview(null); setImage(null);}} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={12} /></button>
                </div>
            ) : (
                <label className="text-center p-4 border-2 border-dashed border-[#62748E] rounded-xl text-[#62748E] cursor-pointer hover:bg-white flex justify-center items-center gap-2">
                    <Upload size={20}/> Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
            )}

            <button type='submit' disabled={loading} className='relative w-full mt-6 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-bold hover:text-lg hover:font-extrabold transition-all cursor-pointer'>
                {loading ? <div className='absolute loaderTwo text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'></div> : "Add Category"}
            </button>
        </form>
    );
};

export default AddCategoryForm;