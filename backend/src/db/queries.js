import pool from "./pool.js";

async function getAllProducts() { // fetch all products
  const { rows } = await pool.query("SELECT * FROM public.products");
  return rows;
}

async function getProductById(id) { // fetch product by id
    const { rows } = await pool.query(
      "SELECT p.*,i.quantity FROM public.products p JOIN public.inventory i ON p.product_id = i.product_id WHERE p.product_id = $1;"
      ,[id]);
    return rows;
}

async function deleteProductById(id) { // delete product by id
    const { rows } = await pool.query("DELETE FROM public.products where product_id = $1 RETURNING *", [id]);
    return rows[0];
}

async function getProductsByCategory(id) { // fetch products by category id
  const { rows } = await pool.query("SELECT p.*,i.quantity FROM public.products p JOIN public.inventory i ON p.product_id = i.product_id WHERE category_id = $1",[id]);
  return rows;
}

async function updateProductById(id,name,price,description,image_url) { // update product by id
    const { rows } = await pool.query(
      `
      UPDATE products
      SET
        name = $2,
        price = $3,
        description = $4,
        image_url = $5
      WHERE product_id = $1
      RETURNING *;
      `,
      [id, name, price, description, image_url]
    );
    return rows[0];
}
  
async function createNewProduct( name,price,description,category_id,image_url ) { // create new product
  const { rows } = await pool.query(
    `
      INSERT INTO products (name, price, description, category_id, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [name, price, description, category_id, image_url]
  );
  return rows[0];
}

async function getAllCategories() { // fetch all categories
  const { rows } = await pool.query(
    `
      SELECT 
      c.*,
      COUNT(p.product_id) AS product_count
      FROM public.categories c
      LEFT JOIN public.products p
        ON c.category_id = p.category_id
      GROUP BY c.category_id, c.name;
    `
  );
  return rows;
}

async function getCategoryById(id) { // fetch category by id
  const { rows } = await pool.query(
    `
      SELECT 
      c.*,
      COUNT(p.product_id) AS product_count
      FROM public.categories c
      LEFT JOIN public.products p
        ON c.category_id = p.category_id
      WHERE c.category_id = $1
      GROUP BY c.category_id, c.name;
    `,[id]
  );
  return rows;
}

async function createCategory(name,description,image_url) { // create new category
  const { rows } = await pool.query( 
    "INSERT INTO categories (name,description,image_url) VALUES ($1,$2,$3) RETURNING *",
    [name,description,image_url]
  );
  return rows[0];
}

async function deleteCategory(id) { // delete category by id
  const { rows } = await pool.query(
    "DELETE FROM categories WHERE category_id = $1 RETURNING *",
    [id]
  );
  return rows[0];
}

async function updateCategory(id, name) { // update category by id
  const { rows } = await pool.query(
    "UPDATE categories SET name = $1 WHERE category_id = $2 RETURNING *",
    [name, id]
  );
  return rows[0];
}

export default {
  getAllProducts,
  getProductById,
  deleteProductById,
  getProductsByCategory,
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  createNewProduct,
  updateProductById
};
