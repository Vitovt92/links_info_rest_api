const express = require('express');
const router = express.Router();

const ctrlApiPresence = require("../controllers/api_presence");

const isLoggedIn = require('../../config/passport/isLoggedIn');

// ------ API presence pages ------
// Майданчики
// Віддати на клієнт інформацію про майданчик
router.get('/info/:presence_id', ctrlApiPresence.ApiPresenceInfo);
// Віддати на клієнт інформацію про всі майданчики
router.get('/list', ctrlApiPresence.ApiPresenceList);
// Додати до бази запис про майданчик
router.post('/newPost', isLoggedIn, ctrlApiPresence.ApiPresenceNewPost);
// Додати до бази коментар про майданчик
router.post('/:presence_id/comment/add', isLoggedIn, ctrlApiPresence.presenceCommentAdd);
// Видалити із бази коментар про майданчик
router.post('/:presence_id/comment/delete/:comment_id', isLoggedIn, ctrlApiPresence.presenceCommentDelete);
// Відрегувати у базі запис про майданчик
router.post('/edit/:presence_id', isLoggedIn, ctrlApiPresence.ApiPresenceEditPost);

// Поєднання обладнення і майданчиків
// Додати до бази запис про поєднання конвертера і майданчику
router.post('/addConverterConnection/:presence_id', isLoggedIn, ctrlApiPresence.addConverterConnection);
// Додати до бази запис про поєднання СФП-модуля і майданчику
router.post('/addSfpConnection/:presence_id', isLoggedIn, ctrlApiPresence.addSfpConnection);
// Додати до бази запис про поєднання Акумулятора і майданчика
router.post('/addBatteryConnection/:presence_id', isLoggedIn, ctrlApiPresence.addBatteryConnection);
// Видалити із бази запис про поєднання конвертора і майданчика
router.post('/:presence_id/deleteConverterPresenceConnection/:connection_id', isLoggedIn, ctrlApiPresence.deleteConverterPresenceConnection);
// Видалити із бази запис про поєднання СФП-модуля і майданчика
router.post('/:presence_id/deleteSfpPresenceConnection/:connection_id', isLoggedIn, ctrlApiPresence.deleteSfpPresenceConnection);
// Видалити із бази запис про поєднання Акумулятора і майданчика
router.post('/:presence_id/deleteBatteryPresenceConnection/:connection_id', isLoggedIn, ctrlApiPresence.deleteBatteryPresenceConnection);


module.exports = router;