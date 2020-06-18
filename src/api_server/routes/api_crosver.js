const express = require('express');
const router = express.Router();

const ctrlApiCrosver = require('../controllers/api_crosver');

const isLoggedIn = require('../../config/passport/isLoggedIn');

// ------ API crosvers pages crosver ------
// Віддати на клієнт інформацію по конкретній муфті
router.get('/info/:crosver_id', ctrlApiCrosver.ApiCrosverInfo);

// Віддати на клієнт інформацію по всім муфтам
router.get('/list', ctrlApiCrosver.ApiCrosverList);

// Додати у базу нову муфту
router.post('/newPost', isLoggedIn, ctrlApiCrosver.ApiCrosverNewPost);

// Відрегувати муфту у базі
router.post('/edit/:crosver_id', isLoggedIn, ctrlApiCrosver.crosverEditPost);

// Додати до бази коментар по муфті
router.post('/:crosver_id/comment/add', isLoggedIn, ctrlApiCrosver.crosverCommentAdd);

// Відалити з бази коментар по муфті
router.post('/:crosver_id/comment/delete/:comment_id', isLoggedIn, ctrlApiCrosver.crosverCommentDelete);

// Додати до бази строку про поєднання муфти і кабелю
router.post('/addCrosverConnection/:crosver_id', isLoggedIn, ctrlApiCrosver.addCrosverConnection);

// Видалити з бази строку про поєднання муфти і кабелю
router.post('/:crosver_id/deleteCableCrosverConnection/:connection_id', isLoggedIn, ctrlApiCrosver.deleteCableCrosverConnection);



module.exports = router;
