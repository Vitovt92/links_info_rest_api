const express = require('express');
const router = express.Router();
const ctrlApiEquipment = require("../../controllers/equipment/api_converter");

const isLoggedIn = require('../../../config/passport/isLoggedIn');

// Віддати на клієнт інформацію про конкретний конвертер
router.get('/info/:equipment_id', ctrlApiEquipment.ApiConverterInfo);

// Віддати на клієнт інформацію про всі конвертери
router.get('/list', ctrlApiEquipment.ApiConverterList);

// Додати до бази данних інформацію про конвертер
router.post('/newPost', isLoggedIn, ctrlApiEquipment.ApiConverterNewPost);

// Відрагувати у базі інформацію про конвертер
router.post('/edit/:equipment_id', isLoggedIn, ctrlApiEquipment.converterEditPost);

// Додати до бази коментар про конвертер
router.post('/:equipment_id/comment/add', isLoggedIn, ctrlApiEquipment.converterCommentAdd);

// Видалити із бази коментар про конвертер
router.post('/:equipment_id/comment/delete/:comment_id', isLoggedIn, ctrlApiEquipment.converterCommentDelete);

// Відправити в утіль конвертер
//router.post('/DeleteEquipment/:equipment_id', isLoggedIn, ctrlApiEquipment.converterDeleteEquipment);

//Відмінити видалення обладнання. (Повернути із утіля)
//Конвертер
//router.post('/deleteEquipmentAbort/:equipment_id', isLoggedIn, ctrlApiEquipment.converterDeleteEquipmentAbort);



module.exports = router;