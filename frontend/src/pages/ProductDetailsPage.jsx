import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Boxes, PencilLine, Trash2 } from 'lucide-react';
import { useState } from 'react';
import BlurModalWrapper from '../components/modals/BlurModalWrapper';
import productService from '../services/productService';

const ProductDetailsPage = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [isDelete,setIsDelete] = useState(false);

    return (
        <div className='p-4 mt-10 mx-auto max-w-7xl'>
                <button onClick={() => navigate(-1)} className='p-3 relative right-2 rounded-2xl flex items-center gap-2 text-[#62748E] font-medium mb-4 text-lg cursor-pointer hover:bg-[#EEF2FF]'>
                    <ArrowLeft className='w-5 h-5'/>
                    Back to Snacks
                </button>
                <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='relative'>
                        <img className='w-[90vw] lg:w-[50vw] lg:h-120 h-90 rounded-2xl' src={state.image} alt="Product Image"/>
                        <div className='absolute top-4 left-4 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-4 py-2 rounded-full text-sm shadow-md'>
                            <p>{state.category_title}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 lg:w-[50vw]'>
                        <div className='bg-[#EBFDF5] text-sm w-fit p-2 rounded-2xl'>In Stock (150)</div>
                        <h1 className='text-3xl font-extrabold'>{state.name}</h1>
                        <h2 className='text-3xl font-extrabold'>$ {state.price}</h2>
                        <div>
                            <div className='rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.12)] p-4 flex items-center gap-4 bg-[#F8FAFC] group'>
                                <div className='p-1 rounded-xl h-fit bg-white shadow-md group-hover:rotate-360 transition-all duration-500'>   
                                    <Boxes/>
                                </div>
                                <div>
                                    <h1>Current Stock</h1>
                                    <h2>{state.count} units</h2>
                                </div>
                            </div>
                        </div>
                        <h2 className='mt-4 text-xl font-extrabold leading-none'>Description</h2>
                        <p className='text-lg text-[#62748E]'>{state.description}</p>
                        <div className='flex gap-6 mt-6 max-w-7xl'>
                            <button className=' text-sm flex gap-2 p-2 rounded-xl w-[70%] bg-gradient-to-r from-indigo-600 to-emerald-500 text-white items-center justify-center transition-transform duration-300 ease-out hover:bg-indigo-600 hover:-translate-y-1 cursor-pointer'>
                                <PencilLine className='w-5 h-5'  /> Edit Product
                            </button>
                            <button onClick={()=>setIsDelete(true)} className='text-sm flex gap-2 p-2 rounded-xl w-[30%] bg-red-500 text-white items-center justify-center ransition-transform duration-300 ease-out hover:bg-red-600 hover:-translate-y-1 cursor-pointer'>
                                <Trash2 className='w-5 h-5' /> Delete
                            </button>
                        </div>
                        <div className='flex flex-col p-4 gap-2 rounded-2xl mt-6 shadow-[0_0_12px_rgba(0,0,0,0.12)]'>
                            <h1>Product Details</h1>
                            <div className='flex p-2 justify-between text-[#62748E]'>
                                <h2>Product ID</h2>
                                <p>{state.id}</p>
                            </div>
                            <div className='flex p-2 justify-between text-[#62748E]'>
                                <h2>Category</h2>
                                <p>{state.category_title}</p>
                            </div>
                            <div className='flex p-2 justify-between text-[#62748E]'>
                                <h2>Status</h2>
                                <p className='text-emerald-500'>Available</p>
                            </div>
        
                        </div>
                    </div>
                </div>
                {isDelete && (
                    <BlurModalWrapper title="Delete Category" onClose={() => setIsDelete(false)}>
                        <div className="flex flex-col justify-center items-center gap-4 mt-6">
                        <img src={state.image} alt="" className="rounded-2xl w-full h-62" />
                        <div className="w-full text-center">
                            <h1 className="text-slate-500 text-lg font-semibold">
                            Are you sure you want to delete {state.title}? 
                            </h1>
                            <p>This action cannot be undone.</p>
                        </div>
                        <div className="flex justify-center gap-4 w-full mt-6"> 
                            <button
                            onClick={() => setIsDelete(false)}
                            className="px-4 py-2 w-[45%] rounded-lg bg-white text-gray-800 transition hover:bg-gray-100"
                            >
                            Cancel
                            </button>
                            <button
                            onClick={async () => {
                                try{
                                await productService().delete(state.id);
                                setIsDelete(false);
                                navigate(-1);
                                }catch(err){
                                alert(err.message);
                                return;
                                }
                            }}
                            className="px-4 py-2 w-[45%] rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                            >
                            Delete
                            </button>
                        </div>
                        </div>
                    </BlurModalWrapper>
                )}
        </div>
    )
}

export default ProductDetailsPage