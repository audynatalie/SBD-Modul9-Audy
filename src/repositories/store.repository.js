const db = require("../database/pg.database");



exports.createStore = async (store) => {
  console.log(store);
  try {
    const res = await db.query(
      "INSERT INTO stores (name, address) VALUES ($1, $2) RETURNING *",
      [store.name, store.address]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Terjadi kesalahan saat mengeksekusi query", error);
  }
};


exports.getID = async (id) => {
  try {
    const res = await db.query("SELECT * FROM stores WHERE id = $1", [id]);
    return res.rows[0];
  } catch (error) {
    console.error("Terjadi kesalahan saat mengeksekusi query", error);
  }
};


exports.getAllStores = async () => {
  try {
    const res = await db.query("SELECT * FROM stores");
    return res.rows;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengeksekusi query", error);
  }
};


exports.deleteStore = async (id) => {
  try {
    const res = await db.query("DELETE FROM stores WHERE id = $1 ", [id]);
    return res.rows[0];
  } catch (error) {
    console.error("Terjadi kesalahan saat mengeksekusi query", error);
  }
}


exports.updateStore = async (store) => {
  try {
    const res = await db.query(
      "UPDATE stores SET name = $1, address = $2 WHERE id = $3 RETURNING *",
      [store.name, store.address, store.id]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Terjadi kesalahan saat mengeksekusi query", error);
  }
}
