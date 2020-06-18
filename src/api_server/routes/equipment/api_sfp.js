const express = require('express');
const router = express.Router();
const ctrlApiEquipment = require("../../controllers/equipment/api_sfp");

const isLoggedIn = require('../../../config/passport/isLoggedIn');

// Віддати на клієнт інформацію про конкретний СФП-модуль
router.get('/info/:equipment_id', ctrlApiEquipment.ApiSfpInfo);

// Віддати на клієнт інформацію про всі СФП-модулі
router.get('/list', ctrlApiEquipment.ApiSfpList);

// Додати до бази данних інформацію про СФП-модуль
router.post('/newPost', isLoggedIn, ctrlApiEquipment.ApiSfpNewPost);

// Відрагувати у базі інформацію про СФП-модуль
router.post('/edit/:equipment_id', isLoggedIn, ctrlApiEquipment.sfpEditPost);

// Додати до бази коментар про СФП-модуль
router.post('/:equipment_id/comment/add', isLoggedIn, ctrlApiEquipment.sfpCommentAdd);

// Видалити із бази коментар про СФП-модуль
router.post('/:equipment_id/comment/delete/:comment_id', isLoggedIn, ctrlApiEquipment.sfpCommentDelete);

// Відправити в утіль СФП-модуль
//router.post('/DeleteEquipment/:equipment_id', isLoggedIn, ctrlApiEquipment.sfpDeleteEquipment);

//Відмінити видалення обладнання. (Повернути із утіля)
// sfp-модуль
//router.post('/deleteEquipmentAbort/:equipment_id', isLoggedIn, ctrlApiEquipment.sfpDeleteEquipmentAbort);


module.exports = router;