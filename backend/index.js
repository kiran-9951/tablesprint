const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes=require("./routes/subcategoryRoutes")
const ProductRoutes=require("./routes/productRoutes")
const port = 5050;
const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/category", categoryRoutes);
app.use("/api/sub",subcategoryRoutes)
app.use("/api/product",ProductRoutes)

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
