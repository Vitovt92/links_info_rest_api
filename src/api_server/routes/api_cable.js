const express = require('express');
const router = express.Router();

const ctrlApiCable = require('../controllers/api_cable');

const isLoggedIn = require('../../config/passport/isLoggedIn');

// ------ API cables pages ------
// Віддати на клієнт інформацію по конкретному кабелю
router.get('/info/:cable_id', ctrlApiCable.ApiCableInfo);
// Віддати на клієнт інформацію про кабелі
router.get('/list', ctrlApiCable.ApiCableList);
// Додати до бази новий кабель
router.post('/newPost', isLoggedIn, ctrlApiCable.ApiCableNewPost);
// Відрегувати у базі запис про кабель
router.post('/edit/:cable_id', isLoggedIn, ctrlApiCable.ApiCableEditPost);
// Додати до бази коментар про кабель
router.post('/:cable_id/comment/add', isLoggedIn, ctrlApiCable.cableCommentAdd);
// Видалити із бази коментар про кабель
router.post('/:cable_id/comment/delete/:comment_id', isLoggedIn, ctrlApiCable.cableCommentDelete);
// додати до бази координату кабелю
router.post('/:cable_id/addCoords/:coordsSerialNamber', isLoggedIn, ctrlApiCable.cableAddCoords);
// Редагувати у базі запис про координату кабелю
router.post('/:cable_id/updateCoords/:coordsSerialNamber', isLoggedIn, ctrlApiCable.cableUpdateCoords);
// Видалити із бази запис про координату кабелю
router.post('/:cable_id/deleteCoords/:coordsSerialNamber', isLoggedIn, ctrlApiCable.cableDeleteCoords);
// Дадати до бази запис про поєднання кабеля і муфти
router.post('/addCrosverConnection/:cable_id', isLoggedIn, ctrlApiCable.addCrosverConnection);
// Видалити із бази запис про поєднання кабеля і муфти
router.post('/:cable_id/deleteCableCrosverConnection/:connection_id', isLoggedIn, ctrlApiCable.deleteCableCrosverConnection);
//Видалити кабель. (Відправити його в архів)
router.post('/deleteCable/:cable_id', isLoggedIn, ctrlApiCable.deleteCable);
//Повернути кабель із архіву
router.post('/deleteCableAbort/:cable_id', isLoggedIn, ctrlApiCable.deleteCableAbort);


module.exports = router;
