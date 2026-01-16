import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import productServiceFunc from '../../services/productService';

const UpdateProductForm = ({ onProductUpdated, onClose, category_id, productData }) => {
    const [productName, setProductName] = useState(productData.name); 
    const [productDesc, setProductDesc] = useState(productData.description);
    const [productPrice, setProductPrice] = useState(productData.price);
    const [productStock, setProductStock] = useState(productData.stock);
    const [image, setImage] = useState(productData.image_url);
    const [preview, setPreview] = useState(productData.image_url);
    const [loading, setLoading] = useState(false);
    const productService = productServiceFunc();
    
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
            const image_secure_url = await productService.uploadImage(image);
            
            const newProduct = await productService.update(productData.id,{
                name: productName,
                description: productDesc,
                price: productPrice,
                image_url: image_secure_url,
                stock: productStock,
                category_id: category_id
            });
            onProductUpdated({
                ...newProduct,
                stock: productStock,
            });
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
            <label className='font-medium text-sm'>Product Name</label>
            <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className='bg-white w-full p-3 rounded-xl mt-1 mb-4 border border-gray-200' 
                placeholder='Enter Product Name' 
                required
            />
            
            <label className='font-medium text-sm'>Description</label>
            <textarea 
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                className='bg-white w-full p-3 resize-none rounded-xl mt-1 mb-4 border border-gray-200' 
                placeholder='Enter Product Description' 
                rows={3}>
            </textarea>

            <label className='font-medium text-sm'>Price $</label>
            <input 
                type="number" 
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className='bg-white w-full p-3 rounded-xl mt-1 mb-4 border border-gray-200' 
                placeholder='Enter Product Price' 
                required
            />

            <label className='font-medium text-sm'>Stock</label>
            <input 
                type="number" 
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                className='bg-white w-full p-3 rounded-xl mt-1 mb-4 border border-gray-200' 
                placeholder='Enter Product Stock' 
                required
            />  

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
                {loading ? <div className='absolute loaderTwo text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'></div> : "Update Product"}
            </button>
        </form>
    );
};

export default UpdateProductForm;