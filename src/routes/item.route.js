
const itemController = require('../controllers/item.controller');

const upload = require('../database/pg.database').upload;

const express = require('express');
const router = express.Router();


router.get('/byStoreId/:store_id', itemController.getItemsByStoreId);
router.put('/', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

router.post('/create', upload.single('image'), itemController.createItem);
router.get('/', itemController.getItems);
router.get('/byId/:id', itemController.getItemsById);

module.exports = router;
