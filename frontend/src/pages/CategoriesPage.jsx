import React from 'react'
import CategoryCard from '../components/modals/CategoryCard'
import { useState,useEffect } from 'react'
import { ArrowLeft,Plus,X,Upload } from 'lucide-react';
import { NavLink } from 'react-router';
import AddCategoryForm from '../components/Forms/AddCategoryForm';
import BlurModalWrapper from '../components/modals/BlurModalWrapper';
import categoryServiceFunc from '../services/categoryService';
import CategorySkeletonGrid from '../components/ui/CategorySkeletonGrid';
import { motion } from 'framer-motion';

const CategoriesPage = () => {

    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const categoryService = categoryServiceFunc();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAll();
                setCategories(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load categories:", err);
            } finally {
                setLoader(false);
            }
        };
    
        fetchCategories();
    }, []);

    const handleNewCategory = (newCat) => {
        setCategories(prev => [...prev, newCat]);
    };
    const handleDeleteFromState = (id) => {
        setCategories(prev => prev.filter(cat => cat.category_id !== id));
    };
    const handleUpdateFromState = (updatedCategory) => {
        setCategories(prev => 
            prev.map(cat => 
                cat.category_id === updatedCategory.category_id ? updatedCategory : cat
            )
        );
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

        <div className='p-5 mt-5 mx-auto max-w-7xl'>
            <NavLink to={'/'} className="w-fit">
                <button className='p-3 relative right-2 rounded-2xl flex items-center gap-2 text-[#62748E] font-medium mb-4 text-lg cursor-pointer hover:bg-[#EEF2FF]'>
                    <ArrowLeft className='w-5 h-5'/>
                    Back to Home
                </button>
            </NavLink>

            <h1 className='text-3xl font-extrabold'>Categories</h1>
            <p className='text-xl text-[#62748E] mt-3'>Browse and manage your product categories</p>
            {loader ? <CategorySkeletonGrid />:
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 justify-items-center lg:justify-items-start'> 
                    {categories.map((category) => (
                        <motion.div key={category.category_id} variants={itemVariants}>
                             <CategoryCard
                                id={category.category_id}
                                image={category.image_url || "https://cdn.greatnews.life/wp-content/uploads/2022/11/Untitled-design-21.png"}
                                title={category.name}
                                description={category.description || "No description available"}
                                count={category.product_count}
                                handleDeleteFromState={handleDeleteFromState}
                                handleUpdateFromState={handleUpdateFromState}
                            />
                        </motion.div>
                    ))}
                    <motion.div variants={itemVariants} onClick={() => setShowForm(true)} className=" w-[90vw] sm:w-[45vw] lg:w-[30vw] xl:max-w-[400px] rounded-3xl bg-white shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 border-3 border-dotted border-white hover:border-blue-500 group cursor-pointer">
                        <div className=' flex flex-col gap-4 h-70 justify-center items-center'>
                            <div className='flex justify-center items-center p-2 w-fit rounded-xl bg-[#F0F5F9] text-[#62748E]'>
                                <Plus className='transition-transform duration-500 group-hover:rotate-90 w-10 h-10' />                       
                            </div>
                            <h1 className='text-center text-xl '>Add Category</h1>
                            <p className='text-center text-[#62748E]'>Create a new product category</p>
                        </div>
                    </motion.div>
                </motion.div>
            }
            {showForm && (
                <BlurModalWrapper title="Add New Category" onClose={() => setShowForm(false)}>
                    <AddCategoryForm
                        onCategoryAdded={handleNewCategory}
                        onClose={() => setShowForm(false)}
                    />
                </BlurModalWrapper>
            )}
        </div>
    )
}

export default CategoriesPage