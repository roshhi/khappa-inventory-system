import { Router } from "express";
const router = Router();
import categoriesController from "../controller/categoriesController.js";
import productsController from "../controller/productsController.js";

router.get("/",categoriesController.fetchCategories); // Get all categories
router.get("/:id",categoriesController.fetchCategoryById); // Get category by ID
router.get('/:id/products', productsController.fetchProductsForCategory); // Get products for a specific category
router.post("/",categoriesController.createNewCategory); // Create a new category
router.put('/:id', categoriesController.updateCategoryById); // Update category by ID
router.delete("/:id",categoriesController.deleteCategoryById);  // Delete category by ID

export default router;