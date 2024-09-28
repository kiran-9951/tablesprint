const subcategoryControllers = require("../controllers/subcategoryControllers");
const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post(
    "/add",
    upload.single("image"),
    subcategoryControllers.addSubCategory
);
router.put(
    "/update/:id",
    upload.single("image"),
    subcategoryControllers.updateSubCategory
);
router.get("/all", subcategoryControllers.getSubCategory);
router.delete("/delete/:id", subcategoryControllers.deleteSubCategory);

module.exports = router;
