const transactionController = require('../controllers/transaction.controller');

const express = require('express');
const router = express.Router();

router.post("/create", transactionController.createTransaction);

router.post("/pay/:id", transactionController.payTransaction);

router.get("/", transactionController.getTransactions);

router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;