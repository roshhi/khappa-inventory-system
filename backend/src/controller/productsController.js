import db from '../db/queries.js';

async function fetchAllProducts(req, res) {   // Function to fetch all products
    try {
        const products = await db.getAllProducts();
        res.status(200).json(products);
        console.log('Fetched inventory:', products);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}  
async function fetchProductById(req, res) {  // Function to fetch a product by ID
    try {
        const { id } = req.params;
        const product = await db.getProductById(id);
        res.status(200).json(product);
        console.log('Fetched product:', product);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
} 
async function updateProduct(req, res) { // Function to update a product by ID
    try {
        const { id } = req.params;
        const { name,price,description,image_url } = req.body;
        const product = await db.updateProductById(id,name,price,description,image_url);
        res.status(200).json(product);
        console.log('Fetched product:', product);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}
async function deleteProductById(req, res) { // Function to delete a product by ID
    try {
        const { id } = req.params;
        const product = await db.deleteProductById(id);
        res.status(200).json(product);
        console.log('Fetched product:', product);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}
async function fetchProductsForCategory(req, res) { // Function to fetch products for a specific category
    try {
        const { id } = req.params;
        const products = await db.getProductsByCategory(id);
        res.status(200).json(products);
        console.log('Fetched inventory:', products);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}  
async function createNewProduct(req, res) { // Function to create a new product
    try {
      const { name,price,description,category_id,image_url } = req.body;
      const product = await db.createNewProduct( name,price,description,category_id,image_url );
      console.log('Created product:', product);
      res.status(201).json(product);
  
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
}

export default { fetchAllProducts,fetchProductById,updateProduct,fetchProductsForCategory,createNewProduct,deleteProductById };