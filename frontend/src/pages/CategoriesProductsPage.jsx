import React, { useState, useEffect } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { useParams, useLocation } from 'react-router'
import { NavLink } from 'react-router'
import { ListFilter } from 'lucide-react'
import axios from 'axios'
import ProductCard from '../components/modals/ProductCard'
import BlurModalWrapper from '../components/modals/BlurModalWrapper'
import AddProductForm from '../components/Forms/AddProductForm'
import CategorySkeletonGrid from '../components/ui/CategorySkeletonGrid'
import {motion} from 'framer-motion'

const CategoriesProductsPage = () => {

    const { id } = useParams();
    const location = useLocation();
    const { description,title } = location.state || {};
    const [categoriesProd, setCategoriesProd] = useState([]);
    const [loader, setLoader] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [tempQuantity, setTempQuantity] = useState(0);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories/${id}/products`)
        .then((res)=>{ setCategoriesProd(res.data); console })
        .catch((err)=>{ console.log(err); })
        .finally(() => {
            setLoader(false);
        });
    },[])

    const handleNewProduct = (newProd,quantity) => {
        console.log("New product added:", newProd);
        setTempQuantity(quantity)
        setCategoriesProd(prev => [...prev, newProd]);
    };

    const containerVariants = {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    return (
        <>
            <div className='p-3 mt-10 mx-auto max-w-7xl'>
                <div className='flex flex-col gap-2'>
                    <NavLink to={'/categories'} className="w-fit">
                        <button className='p-3 relative right-2 rounded-2xl flex items-center gap-2 text-[#62748E] font-medium mb-4 text-lg cursor-pointer hover:bg-[#EEF2FF]'>
                            <ArrowLeft className='w-5 h-5'/>
                            Back to Categories
                        </button>
                    </NavLink>
                    <h1 className="capitalize text-4xl font-extrabold">{title}</h1>
                    <p className='text-xl text-[#62748E] mt-1'>{description}</p>
                    {loader ? <CategorySkeletonGrid/> 
                    :
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 justify-items-center lg:justify-items-start'>
                        {
                            categoriesProd.map((product) =>{
                                return (
                                    <motion.div variants={itemVariants} key={product.product_id}>
                                        <ProductCard
                                            id={product.product_id}
                                            image_url={product.image_url || "https://cdn.greatnews.life/wp-content/uploads/2022/11/Untitled-design-21.png"}
                                            name={product.name}
                                            description={product.description || "No description available"}
                                            stock={product.quantity || tempQuantity}
                                            price={product.price || 0}
                                            category_title={title}
                                        />
                                    </motion.div>
                                )
                            })
                        }
                        <motion.div variants={itemVariants} onClick={()=>setShowForm(true)} className=" w-[90vw] h-full sm:w-[45vw] lg:w-[30vw] xl:max-w-[400px] rounded-3xl bg-white shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 border-3 border-dotted border-white hover:border-blue-500 group cursor-pointer">
                            <div className=' flex h-80 flex-col gap-4 justify-center items-center'>
                                <div className='flex justify-center items-center p-2 w-fit rounded-xl bg-[#F0F5F9] text-[#62748E]'>
                                    <Plus className='transition-transform duration-500 group-hover:rotate-90 w-10 h-10' />                       
                                </div>
                                <h1 className='text-center text-xl '>Add Product</h1>
                                <p className='text-center text-[#62748E]'>Add a new product in this category</p>
                            </div>
                        </motion.div>
                    </motion.div>}
                </div>
            </div>
            
            {showForm && (
                <BlurModalWrapper title={"Add Product"} onClose={()=>setShowForm(false)}>
                    <AddProductForm
                        onProductAdded={handleNewProduct}
                        id={id}
                        onClose={() => setShowForm(false)}
                    />
                </BlurModalWrapper>
            )}
        </>

    )
}

export default CategoriesProductsPage