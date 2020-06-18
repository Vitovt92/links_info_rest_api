const express = require('express');
const router = express.Router();
const ctrlApiEquipment = require("../../controllers/equipment/api_systemPower");

const isLoggedIn = require('../../../config/passport/isLoggedIn');

// Віддати на клієнт інформацію про конкретній Блок живлення
router.get('/info/:equipment_id', ctrlApiEquipment.ApiSystemPowerInfo);

// Віддати на клієнт інформацію про всі Блоки живлення
router.get('/list', ctrlApiEquipment.ApiSystemPowerList);

// Додати до бази данних інформацію про Блок живлення
router.post('/newPost', isLoggedIn, ctrlApiEquipment.ApiSystemPowerNewPost);

// Відрагувати у базі інформацію про Блок живлення
router.post('/edit/:equipment_id', isLoggedIn, ctrlApiEquipment.SystemPowerEditPost);

// Додати до бази коментар про Блок живлення
router.post('/:equipment_id/comment/add', isLoggedIn, ctrlApiEquipment.SystemPowerCommentAdd);

// Видалити із бази коментар про Блок живлення
router.post('/:equipment_id/comment/delete/:comment_id', isLoggedIn, ctrlApiEquipment.SystemPowerCommentDelete);

// Відправити в утіль Блок живлення
//router.post('/DeleteEquipment/:equipment_id', isLoggedIn, ctrlApiEquipment.SystemPowerDeleteEquipment);

//Блок живлення
//router.post('/deleteEquipmentAbort/:equipment_id', isLoggedIn, ctrlApiEquipment.SystemPowerDeleteEquipmentAbort);

// Додати до бази запис про поєднання Блока живлення і мегатазика
router.post('/addSystemPowerMegatazConnection/:equipment_id', isLoggedIn, ctrlApiEquipment.addSystemPowerMegatazConnection);

// Видалити із бази запис про поєднання Блока живлення і мегатазика.
router.post('/:equipment_id/deleteSystemPowerMegatazConnection/:connection_id', isLoggedIn, ctrlApiEquipment.deleteSystemPowerMegatazConnection);


module.exports = router;