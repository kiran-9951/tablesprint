const express = require("express");
const categoryControllers = require("../controllers/categoryControllers");
const uploadFile = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post(
    "/add",
    uploadFile.single("image"),
    categoryControllers.addCategory
);

router.put(
    "/update/:id",
    uploadFile.single("image"),
    categoryControllers.updateCategory
);

router.get("/all", categoryControllers.getAllCategory);
router.delete("/delete/:id", categoryControllers.deleteCategory);

module.exports = router;
