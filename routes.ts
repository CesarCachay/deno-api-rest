import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.ts";

const router = new Router();

router.get("/api/products", getProducts);
router.get("/api/products/:id", getProduct);
router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

export default router;
