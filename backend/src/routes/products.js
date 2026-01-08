import { Router } from "express";
const router = Router();
import productsController from "../controller/productsController.js";

router.get("/",productsController.fetchAllProducts); // Get all products
router.get("/:id",productsController.fetchProductById); // Get product by ID
router.post("/",productsController.createNewProduct); // Create a new product
router.put("/:id",productsController.updateProduct); // Update product by ID
router.delete("/:id",productsController.deleteProductById); // Delete product by ID

export default router;