const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/productsControllers");

router.post("/addProduct", productsControllers.addProducts);
router.put("/update/:id", productsControllers.updateProducts);
router.get("/getProducts", productsControllers.getProducts);
router.delete("/delete/:id", productsControllers.deleteProducts);
module.exports = router;
