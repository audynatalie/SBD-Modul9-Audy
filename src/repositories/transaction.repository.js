const db = require("../database/pg.database");

exports.createTransaction = async (transaction) => {
    try {
        const res = await db.query(
            "INSERT INTO transactions (item_id, quantity, user_id, total) VALUES ($1, $2, $3, $4) RETURNING *",
            [transaction.item_id, transaction.quantity, transaction.user_id, transaction.total]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};


exports.getTransactions = async () => {
    try {
        const res = await db.query("SELECT id, item_id, quantity, user_id, total, status FROM transactions");
        return res.rows;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};

exports.payTransaction = async (transaction_id) => {
    console.log(transaction_id);
    try {
        const res = await db.query(
            "UPDATE transactions SET status = 'paid' WHERE id = $1 RETURNING *",
            [transaction_id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};


exports.getTransactionById = async (transaction_id) => {
    console.log(transaction_id);
    try {
        const res = await db.query("SELECT * FROM transactions WHERE id = $1", [transaction_id]);
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
    }
};


exports.deleteTransaction = async (transactionId) => {
    try {
        const res = await db.query("DELETE FROM transactions WHERE id = $1 RETURNING *", [transactionId]);
        if (!res || res.rows.length === 0) {
            throw new Error("Transaction not found");
        }
        return res.rows[0];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengeksekusi query", error);
        throw error;
    }
};