const db = require("../database/pg.database");


exports.checkStoreExists = async (store_id) => {
   
    try {
        const res = await db.query("SELECT * FROM stores WHERE id = $1", [store_id]);
        return res.rows.length > 0;
  
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};

exports.createItem = async (item, image) => {
 
    try {
        const uploadResponse = await db.cloudinary.uploader.upload(image.path);
        const res = await db.query(
            "INSERT INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [item.name, item.price, item.store_id, uploadResponse.secure_url, item.stock]
        );
        return res.rows[0];
    
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};


exports.getItems = async () => {
   
    try {
        const res = await db.query("SELECT * FROM items");
        return res.rows;
    
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};

exports.getItemsById = async (id) => {
  
    try {
        const res = await db.query("SELECT * FROM items WHERE id = $1", [id]);
        return res.rows[0];
  
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
}

exports.getItemsByStoreId = async (store_id) => {
   
    try {
        const res = await db.query("SELECT * FROM items WHERE store_id = $1", [store_id]);
        return res.rows;
  
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
}

exports.deleteItem = async (id) => {
  
    try {
        const res = await db.query("DELETE FROM items WHERE id = $1", [id]);
        return res.rows[0];
   
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};


exports.updateItem = async (item, image) => {
   
    try {
        let imageUrl = item.image_url;
        if (image) {
            const uploadResponse = await db.cloudinary.uploader.upload(image.path);
            imageUrl = uploadResponse.secure_url;
        }
     
        const res = await db.query(
            "UPDATE INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [item.name, item.price, item.store_id, imageUrl, item.stock, item.id]
        );
        return res.rows[0];
   
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};