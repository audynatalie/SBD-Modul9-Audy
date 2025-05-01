require("dotenv").config();

const cloudinary = require("cloudinary").v2;

const multer = require("multer");

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

cloudinary.config({
  connectionString: process.env.CLOUDINARY_URL,
});

const connect = async () => {
  
  try {
    await pool.connect();
    console.log("Connected to the database");
  
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

connect();
const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengeksekusi query", error);
  }
};

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  query,
  cloudinary,
  upload,
};
