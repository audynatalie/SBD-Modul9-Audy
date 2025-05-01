const db = require("../database/pg.database");



exports.getAllUsers = async () => {
    try {
        const res = await db.query("SELECT * FROM users");
        return res.rows;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};

exports.getUserByEmail = async (email) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};


exports.createUser = async (user) => {
    try {
        const res = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [user.name, user.email, user.password]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};


exports.updateUser = async (user) => {
    try {
        const res = await db.query(
            "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
            [user.name, user.email, user.password, user.id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};



exports.userTopUp = async (id, amount) => {
    try {
        const res = await db.query(
            "UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING *",
            [amount, id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};

exports.getUserById = async (id) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
}


exports.deleteUser = async (id) => {
    try {
        const res = await db.query(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};
