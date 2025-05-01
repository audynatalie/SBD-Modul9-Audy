const storeRepository = require("../repositories/store.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.getAllStores = async (req, res) => {
 
  try {
    const stores = await storeRepository.getAllStores();
    return baseResponse(
      res,
      true,
      200,
      "Stores found",
      stores
    );
  
  } catch (error) {
    return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil toko", error);
  }
};

exports.createStore = async (req, res) => {

  if (!req.body.name || !req.body.address) {
    return baseResponse(res, false, 400, "Name and address are required", null);
  }

  try {
    const store = await storeRepository.createStore(req.body);
    return baseResponse(res, true, 201, "Store created", store);
  
  } catch (error) {
    return baseResponse(res, false, 500, "Error creating store", error);
  }
};

exports.getID = async (req, res) => {
 
  try {
    const store = await storeRepository.getID(req.params.id);
    if (!store) {
      return baseResponse(res, false, 404, "Store not found", null);
    }
  
    return baseResponse(res, true, 200, "Store found", store);
 
  } catch (error) {
    return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil toko", error);
  }
}



exports.deleteStore = async (req, res) => {
 
  try {
    const store = await storeRepository.getID(req.params.id);
    if (!store) {
      return baseResponse(res, false, 404, "Store not found", null);
    }
 
    await storeRepository.deleteStore(req.params.id);
    return baseResponse(res, true, 200, "Store deleted", {store, payload: req.params.id});
  
  } catch (error) {
    return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil toko", error);
  }
}


exports.updateStore = async (req, res) => {
  if (!req.body || !req.body.name || !req.body.address) {
    return baseResponse(res, false, 400, "Name and address are required", null);
  }

  try {
    const store = await storeRepository.getID(req.params.id);
    if (!store) {
      return baseResponse(res, false, 404, "Store not found", null);
    }
  
    const updatedStore = await storeRepository.updateStore(req.params.id, req.body);
    return baseResponse(res, true, 200, "Store updated", { store: updatedStore, payload: req.body });
  
  } catch (error) {
    return baseResponse(res, false, 500, "Terjadi kesalahan saat mengambil toko", error);
  }
}
