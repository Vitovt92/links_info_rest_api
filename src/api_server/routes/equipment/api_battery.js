const express = require('express');
const router = express.Router();
const ctrlApiEquipment = require("../../controllers/equipment/api_battery");

const isLoggedIn = require('../../../config/passport/isLoggedIn');


// Віддати на клієнт інформацію про конкретний акумулятор
router.get('/info/:equipment_id', ctrlApiEquipment.ApiBatteryInfo);

// Віддати на клієнт інформацію про всі Акумулятори
router.get('/list', ctrlApiEquipment.ApiBatteryList);

// Додати до бази данних інформацію про Акумулятор
router.post('/newPost', isLoggedIn, ctrlApiEquipment.ApiBatteryNewPost);

// Відрагувати у базі інформацію про Акумулятор
router.post('/edit/:equipment_id', isLoggedIn, ctrlApiEquipment.batteryEditPost);

// Додати до бази коментар про Акумулятор
router.post('/:equipment_id/comment/add', isLoggedIn, ctrlApiEquipment.batteryCommentAdd);

// Видалити із бази коментар про акумулятор
router.post('/:equipment_id/comment/delete/:comment_id', isLoggedIn, ctrlApiEquipment.batteryCommentDelete);

// Відправити в утіль Акумулятор
router.post('/DeleteEquipment/:equipment_id', isLoggedIn, ctrlApiEquipment.batteryDeleteEquipment);

//Відмінити видалення обладнання. (Повернути із утіля)
//аккумулятор
router.post('/deleteEquipmentAbort/:equipment_id', isLoggedIn, ctrlApiEquipment.batteryDeleteEquipmentAbort);


module.exports = router;