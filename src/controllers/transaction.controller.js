const transactionRepository = require('../repositories/transaction.repository');
const userRepository = require('../repositories/user.repository')
const itemRepository = require('../repositories/item.repository');

const baseResponse = require('../utils/baseResponse.util');

exports.getTransactions = async (req, res) => {
  
    try {
        const transactions = await transactionRepository.getTransactions();
        const detailedTransactions = await Promise.all(transactions.map(async (transaction) => {
     
            const user = await userRepository.getUserById(transaction.user_id);
            const item = await itemRepository.getItemsById(transaction.item_id);
        
            return {
                ...transaction,
                user,
                item
            };
        }));
        
        return baseResponse(res, true, 200, 'Transactions found', detailedTransactions);
  
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        return baseResponse(res, false, 500, 'Terjadi kesalahan pada transaksi', error.message);
    }
};


exports.createTransaction = async (req, res) => {
   
    const { item_id, quantity, user_id } = req.body;
    const item = await itemRepository.getItemsById(item_id);

    if (!item) {
        return baseResponse(res, false, 404, 'Item not found', null);}

    req.body.total = item.price * quantity;
    if (!item_id || !user_id) {
        return baseResponse(res, false, 400, 'Item ID, quantity, and user ID are required', null);
    }

    if (quantity <= 0) {
        return baseResponse(res, false, 400, 'Quantity must be larger than 0', null);
    }

    try {
        const transaction = await transactionRepository.createTransaction(req.body);
        return baseResponse(res, true, 201, 'Transaction created', transaction);
 
    } catch (error) {
        console.error('Error creating transaction:', error);
        return baseResponse(res, false, 500, 'Terjadi kesalahan saat membuat transaksi', error.message);
    }
};

exports.payTransaction = async (req, res) => {
 
    const transaction_id = req.params.id;
    console.log(transaction_id)

    if (!transaction_id) {
        return baseResponse(res, false, 400, 'Transaction ID is required', null);
    }
    try {
        const transaction = await transactionRepository.getTransactionById(transaction_id);
        console.log("Transactions",transaction)
        if (!transaction) {
            return baseResponse(res, false, 404, 'Failed to pay', null);
        }

        const item = await itemRepository.getItemsById(transaction.item_id);
        if (!item) {
            return baseResponse(res, false, 404, 'Item not found', null);
        }

        if (item.stock < transaction.quantity) {
            return baseResponse(res, false, 400, 'Insufficient item stock', null);
        }

        const user = await userRepository.getUserById(transaction.user_id);
        console.log(user)
        if (!user) {
            return baseResponse(res, false, 404, 'User not found', null);
        }

        if (user.balance < transaction.total) {
            return baseResponse(res, false, 400, 'Insufficient user balance', null);
        }
        
        await itemRepository.updateItem(transaction.item_id, item.stock - transaction.quantity);
        await userRepository.updateUser(transaction.user_id, user.balance - transaction.total);

        const updatedTransaction = await transactionRepository.payTransaction(transaction_id);
        return baseResponse(res, true, 200, 'Payment successful', updatedTransaction);
   
    } catch (error) {
        console.error('Error paying transaction:', error);
        return baseResponse(res, false, 500, 'Terjadi kesalahan saat membayar transaksi', error.message);
    }
};


exports.deleteTransaction = async (req, res) => {
 
    const transaction_id = req.params.id;
    try {
        const transaction = await transactionRepository.deleteTransaction(transaction_id);
        baseResponse(res, true, 200, "Transaction deleted", transaction);
 
    } catch (error) {
        if (error.message === "Transaction not found") {
            return baseResponse(res, false, 404, "Transaction not found", null);
        }
        baseResponse(res, false, 500, error.message || "Terjadi kesalahan pada server", null);
    }
};

