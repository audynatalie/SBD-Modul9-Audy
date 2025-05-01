const itemRepository = require("../repositories/item.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.createItem = async (req, res) => {
  
    const {name, price, store_id, stock} = req.body;
    const image = req.file;
  
    try {
        const storeExists = await itemRepository.checkStoreExists(store_id);
        if (!storeExists) {
            return baseResponse(res, false, 404, "Store doesn't exist", null);
        }
        const newItem = await itemRepository.createItem({name, price, store_id, stock}, image);
        return baseResponse(res, true, 201, "Item created", newItem);
  
    } catch (error) {
        return baseResponse(res, false, 500, "Error creating item", error);
    }
};

exports.getItems = async (req, res) => {
   
    try {
        const items = await itemRepository.getItems();
        return baseResponse(res, true, 200, "Items found", items);
    
    } catch (error) {
        return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil item", error);
    }
};

exports.getItemsByStoreId = async (req, res) => {
   
    try {
        const items = await itemRepository.getItemsByStoreId(req.params.store_id);
        if (!items) {
            return baseResponse(res, false, 404, "Store doesnt Exist", null);
        }
        return baseResponse(res, true, 200, "Items found", items);
   
    } catch (error) {
        return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil item", error);
    }
};
exports.getItemsById = async (req, res) => {
   
    try {
        const items = await itemRepository.getItemsById(req.params.id);
        if (!items) {
            return baseResponse(res, false, 404, "Item not found", null);
        }
        return baseResponse(res, true, 200, "Items found", items);
   
    } catch (error) {
        return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil item", error);
    }
};

exports.deleteItem = async (req, res) => {
  
    try {
        const item = await itemRepository.getItemsById(req.params.id);
        if (!item) {
            return baseResponse(res, false, 404, "Item not found", null);
        }
        await itemRepository.deleteItem(req.params.id);
        return baseResponse(res, true, 200, "Item deleted", item);
  
    } catch (error) {
        return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil item", error);
    }
};


exports.updateItem = async (req, res) => {
   
    const {name, price, store_id, stock, id} = req.body;
    const image = req.file;
    try {
        const item = await itemRepository.getItemsById(req.params.id);
        if (!item) {
            return baseResponse(res, false, 404, "Store doesnt exist found", null);
        }
        const updatedItem = await itemRepository.updateItem({name, price, store_id, stock, id}, image);
        return baseResponse(res, true, 200, "Item updated", updatedItem);
  
    } catch (error) {
        return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil item", error);
    }
};

