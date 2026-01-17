import {CirclePile, ArrowRight, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import { useEffect,useState } from "react";
export default function LandingPage(){

    const [totalStocks, setTotalStocks] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const stocks = await productService().getStocksCount();
          const products = await productService().getProductCount();
          const categories = await categoryService().getCategoryCount();
  
          setTotalStocks(stocks);
          setTotalProducts(products);
          setTotalCategories(categories);
          setLoading(false);
        } catch (error) {
          console.error("Failed to load stats", error);
        }
      };
  
      fetchStats();
    }, []);

    const stats = [
        {
          label: 'Total Stock',
          value: totalStocks,
          icon: Package,
          color: 'from-violet-500 to-purple-600',
          delay: 0.1,
          border: 'border-purple-500',
          backgroundColor: 'hover:bg-purple-50',
        },
        {
          label: 'Products',
          value: totalProducts,
          icon: ShoppingBag,
          color: 'from-cyan-500 to-blue-600',
          delay: 0.2,
          border: 'border-blue-500',
          backgroundColor: 'hover:bg-blue-50',
        },
        {
          label: 'Categories',
          value: totalCategories,
          icon: TrendingUp,
          color: 'from-emerald-500 to-green-600',
          delay: 0.3,
          border: 'border-green-500',
          backgroundColor: 'hover:bg-green-50',
        },
    ];
    const containerVariants = {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };
    const itemVariants2 = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    return(
        
        <div className="flex flex-col items-center justify-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col items-center justify-center space-y-2 mt-25 ">
                <motion.div variants={itemVariants2} className="flex items-center text-xs bg-[#EEF2FF] w-fit px-4 py-2 rounded-2xl space-x-2 text-indigo-600 group">
                    <CirclePile className="w-5 h-5 transition-transform duration-500 ease-out group-hover:rotate-180"/>
                    <h1 className="text-md">Modern Inventory Solution</h1>
                </motion.div>
                <motion.div variants={itemVariants2} className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl text-center md:text-6xl xl:text-7xl font-extrabold mt-3">Inventory Management,</h1>
                    <span className="text-5xl md:text-6xl xl:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 leading-none pb-2">Reimagined.</span>
                    <p className="text-xl pl-5 pr-5 text-[#62748E] text-center max-w-2xl mt-2 ">Khappa streamline your product tracking with an elegant, powerful interface 
                    designed for modern businesses.</p>
                </motion.div>
                <motion.div variants={itemVariants2} className="flex items-center space-x-6 mt-6">
                    <NavLink to={'/categories'}>
                        <button className=" group flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-6 py-3 rounded-2xl transition-transform duration-300 ease-out hover:bg-none border-2 hover:text-indigo-500 hover:border-indigo-500 cursor-pointer">
                            <p>Explore Dashboard </p>
                            <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-2"/>
                        </button>
                    </NavLink>
                </motion.div>
            </motion.div>
            <div className="mt-20 mb-20">
                <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ">
                    {stats.map((stat)=>{
                        const Icon = stat.icon;
                        return(
                            <motion.div key={stat.label} variants={itemVariants} className={`flex flex-col items-center text-center shadow-lg rounded-xl min-w-[240px] p-6 m-4 border-t-4 transition-transform duration-300 ease-out ${stat.border} ${stat.backgroundColor} hover:-translate-y-1`}>
                                <div className={`w-15 h-15 mx-auto mb-6 text-white rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}> 
                                    <Icon/> 
                                </div>
                                <div className="relative text-4xl font-extrabold w-12 h-12">
                                    {loading?<div className="absolute text-black/50 loaderTwo top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] truncate"></div> : stat.value > 9999 ? "9999+" : stat.value }
                                </div>
                                <h2 className="text-xl text-[#62748E] ">
                                    {stat.label}
                                </h2>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}