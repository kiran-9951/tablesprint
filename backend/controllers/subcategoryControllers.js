const Database = require("../database/configuration");
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "delete from SubCategory where id =?";
    Database.query(query, [id], (err, data) => {
      if (err) {
        console.error("internal error", err);
        return res.status(500).json({ message: "bad response from server" });
      }
      res.status(200).json({ message: "deleted successfully" });
    });
  } catch (error) {}
};

const getSubCategory = async (req, res) => {
  try {
    const query = "select * from  SubCategory";
    Database.query(query, (err, data) => {
      if (err) {
        console.error("internal error", err);
        return res.status(500).json({ message: "bad response from server" });
      }
      res.status(200).json({ message: "data fetched successfully",data });
    });
  } catch (error) {
    console.error(error);
  }
};

const addSubCategory = async (req, res) => {
  try {
    const { subcategory_name, category_name, status, sequence } = req.body;
    const image  = req.file
    if (!subcategory_name || !category_name || !status || !sequence) {
      return res.status(400).json({ message: "all fields are required" });
    }
    if (!image) {
      return res.status(400).json({ message: "Image not uploaded" });
    }
    const imageUrl = `uploads/${image.filename}`;

    const query =
      "insert into SubCategory (subcategory_name,category_name,image,sequence,status) values (?,?,?,?,?)";
    Database.query(
      query,
      [subcategory_name, category_name, imageUrl, sequence, status],
      (err, data) => {
        if (err) {
          console.error("internal error", err);
          return res.status(500).json({ message: "server error " });
        }
        res.status(200).json({ message: "successfully  added ", data });
      }
    );
  } catch (error) {
    console.error("internal error", error);
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { subcategory_name, category_name, status, sequence } = req.body;
    const { image } = req.file;
    const { id } = req.params;

    let query =
      "UPDATE SubCategory SET subcategory_name = ?, category_name = ?, sequence = ?, status = ?";
    let values = [subcategory_name, category_name, sequence, status];

    // If an image is provided, update it as well
    if (image) {
      const imageUrl = `uploads/${image.filename}`;
      query += ", image = ?";
      values.push(imageUrl);
    }

    query += " WHERE id = ?";
    values.push(id);

    Database.query(query, values, (err, data) => {
      if (err) {
        console.error("Internal error", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "SubCategory not found" });
      }
      res
        .status(200)
        .json({ message: "SubCategory successfully updated", data });
    });
  } catch (error) {
    console.error("Internal error", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addSubCategory,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
};
