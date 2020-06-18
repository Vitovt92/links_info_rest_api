const express = require('express');
const router = express.Router();
const ctrlApiCrosver = require('../controllers/api_crosver');
const ctrlApiCable = require('../controllers/api_cable');
const ctrlApiPresence = require("../controllers/api_presence");
const ctrlApiEquipment = require("../controllers/api_equipment");
const ctrlApiForDuty = require("../controllers/api_forDuty");

const isLoggedIn = require('../../config/passport/isLoggedIn');




// ------ API equipment pages ------
// Обладнання


// Віддати на клієнт інформацію про всі Мегатазики
router.get('/equipment/megataz/list', ctrlApiEquipment.ApiMegatazList);
// Віддати на клієнт інформацію про всі Блочки живлення
router.get('/equipment/littleSystemPower/list', ctrlApiEquipment.ApiLittleSystemPowerList);

// Додати до бази данних інформацію про Блочок живлення
router.post('/forDuty/littleSystemPower/AddNew', ctrlApiForDuty.ApilittleSystemPowerAddNew);

// Поєдннання Блоків живлення із маленькими блочками живлення і мегатазами
// Додати Блок живлення до Мегатаза. 

// Додати до бази запис про встановлення Серверу мегатазі (поєднання із Блоком живлення)

router.post('/forDuty/addNewServerToSystemPower', ctrlApiForDuty.addNewServerToSystemPower);


module.exports = router;
