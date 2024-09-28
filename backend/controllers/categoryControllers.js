const Database = require("../database/configuration");
const addCategory = async (req, res) => {
  const { category_name, sequence, status } = req.body;
  
  const image = req.file;
  console.log(image)
  if (!image) {
    return res.status(400).json({ message: "Image not uploaded" });
  }

  const imageUrl = `uploads/${image.filename}`;

  const uploadQuery = "INSERT INTO Category (category_name, image, sequence,status) VALUES (?, ?, ?,?)";
  
  Database.query(uploadQuery, [category_name, imageUrl, sequence,status], (err, data) => {
    if (err) {
      console.error("Error occurred while uploading:", err);
      return res.status(500).json({ message: "Failed to save image" });
    }

    if(data.category_name ===req.body.category_name){
        res.status(400).json({message:"category already exist try another categoryName"})
    }

    res.status(200).json({ message: "Uploaded successfully", data });
  });
};

const getAllCategory = (req, res) => {
    const query = "SELECT * FROM Category";
    
    Database.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching categories:", err);
        return res.status(500).json({ message: "Failed to fetch categories" });
      }

      console.log("Fetched categories:");  // Add this for debugging
      res.status(200).json(results);
    });
};


  const updateCategory = (req, res) => {
    const { category_name, sequence, status } = req.body;
    const image = req.file; 
    const { id } = req.params; 

    let query = "UPDATE Category SET category_name = ?, sequence = ?, status = ?";
    const params = [category_name, sequence, status];

    // Check if a new image was uploaded
    if (image) {
        const imageUrl = `uploads/${image.filename}`; // Assuming uploads folder is accessible via this URL
        query += ", image = ?"; 
        params.push(imageUrl);
    }

    // Push the category ID to the parameters for the WHERE clause
    params.push(id); 

    // Execute the query
    Database.query(query + " WHERE id = ?", params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Error while updating" });
        }
        res.status(200).json({ message: "Updated successfully", data });
    });
};


const deleteCategory =async(req,res)=>{
    const{id}=req.params
    const query="delete from Category where id=?"
    Database.query(query,[id],(err,data)=>{
        if(err){
            console.error("error while deleting",err)
            return res.status(500).json({message:"server issue in deleting"})
        }
        res.status(200).json({message:"deleted succesfully"})
    })

}


module.exports = { addCategory,getAllCategory ,updateCategory,deleteCategory};
