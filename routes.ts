import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.ts";

const router = new Router();

router.get("/api/products", getProducts)
  .get("/api/products/:id", getProduct)
  .post("/api/products", createProduct)
  .put("/api/products/:id", updateProduct)
  .delete("/api/products/:id", deleteProduct);

export default router;
