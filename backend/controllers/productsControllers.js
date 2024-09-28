const Database = require("../database/configuration");
const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "delete from Product where id = ?";
    Database.query(query, [id], (err, data) => {
      if (err) {
        console.error("error found", err);
        return res.status(500).json({ message: "errorFound in server" });
      }
      res.status(200).json({ message: "deleted successfully" });
    });
  } catch (error) {
    console.log(error, "internal error");
  }
};
const getProducts = async (req, res) => {
  try {
    const query = "select * from Product";
    Database.query(query, (err, data) => {
      if (err) {
        console.error("error found", err);
        return res.status(500).json({ message: "server problem" });
      } else if (data.length === 0) {
        res.status(400).json({ message: "products not found" });
      }
      res.status(200).json({ message: "fetched successfully", data });
    });
  } catch (error) {
    console.log(error, "internal error");
  }
};

const updateProducts = async (req, res) => {
  try {
    const { product_name, subcategory_name, category_name, status } = req.body;
    console.log(product_name, subcategory_name, category_name, status )
    const {id}=req.params;
    const query = "update Product set product_name = ?, subcategory_name = ?, category_name = ?, status =?"

  Database.query(query,[id],(err,data)=>{
    if (err) {
        console.error("error found", err);
        return res.status(500).json({ message: "errorFound in server" });
    }

    if(data.category_name ===null){
        req.status(400).json({message:"category not found"})
    }
    if(data.subcategory_name ===null){
        req.status(400).json({message:"subcategory not found"})
    }

    res.status(200).json({message:"updated successfully",data})
  })

  } catch (error) {}
};
const addProducts = async (req, res) => {
  try {
    const { product_name, subcategory_name, category_name, status } = req.body;
    console.log(product_name, subcategory_name, category_name, status);

    if (!product_name || !subcategory_name || !category_name || !status) {
      req.status(400).json({ message: "all fields are required" });
    }

    const query =
      "insert into Product (product_name,  subcategory_name,category_name,status) values (?,?,?,?)";

    Database.query(query, (err, data) => {
      if (err) {
        console.error("error found", err);
        return res.status(500).json({ message: "errorFound in server" });
      }
      res.status(200).json({ message: "product created successfully", data });

      if(data.category_name ===null){
        req.status(400).json({message:"category not found"})
    }
    if(data.subcategory_name ===null){
        req.status(400).json({message:"subcategory not found"})
    }
    });
  } catch (error) {}
};
module.exports = { addProducts, getProducts, deleteProducts, updateProducts };
