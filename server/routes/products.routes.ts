import { Router } from "express";
import {
    GetProductPlants,
    getSalesProductIncome,
    getTopSellingProduct,
    ProductsPlants,
    SaleAnalysisProduct,
    sales_income_summary,
    salesProduct
} from "../controllers/server.controllers.product.ts";

import { VerifySession } from "../middleware/server.middleware.verifySession.ts";
// import multer from "multer";

const router = Router();


router.post('/products/addlisting_plants', VerifySession, ProductsPlants);
router.get('/products/getAllPlants', VerifySession, GetProductPlants)
router.get('/sale_analysis/product', VerifySession, SaleAnalysisProduct)
router.get('/sales_income_summary', VerifySession, sales_income_summary)
router.post('/sales/post/product', VerifySession, salesProduct)
router.get('/sales/get/product', VerifySession, getSalesProductIncome)
router.get('/getTopSelling/sales/product', VerifySession, getTopSellingProduct)
export default router                