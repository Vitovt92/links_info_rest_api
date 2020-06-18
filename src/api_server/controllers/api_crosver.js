// var connectToBase = require('../models/sql_crosver');
var mysql = require('promise-mysql');
var Sequelize = require('sequelize');

var models = require('../models/sql_index');
var Crosver = models.Crosver;
var CrosverPhoto = models.CrosverPhoto;
var CrosverComment =  models.CrosverComment;
var CableCrosverConnection = models.CableCrosverConnection;
var Cable = models.Cable;

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

//Show crosver inforvation
module.exports.ApiCrosverInfo = function(req, res) {
    Crosver.findOne({where: {id: req.params.crosver_id},
                  include: [{
                              model: CrosverPhoto
                            },
                            {
                              model: CrosverComment
                            },
                            {
                              model: CableCrosverConnection,
                              include: [Cable]
                            }
                ]
    }).then(crosverById => {

      sendJsonResponse(res, 200, crosverById.dataValues);
  });
};

//Show list of crosvers

module.exports.ApiCrosverList = function(req, res) {

    Crosver.findAll({include: [{
                                    model: CrosverPhoto
                                },
                                {
                                    model: CrosverComment
                                }
                              ],
                              order: [
                                  ['id', 'DESC']
                              ]
                            }).then(crosvers =>{
      sendJsonResponse(res, 200, crosvers);
  });
};

//Form to add new crosver
module.exports.ApiCrosverNewPost = function(req, res) {

  Crosver.create(req.body.postdata).then(crosver =>{
    sendJsonResponse(res, 200, crosver);
});
};

//Post req to Edit Crosver DataBase
module.exports.crosverEditPost = function(req, res) {

  Crosver.update(req.body.postData, {
    where: {
      id: req.params.crosver_id
    }
  }).then(crosver =>{
    sendJsonResponse(res, 200, crosver);
  });

};

// Додати до муфти коментар
module.exports.crosverCommentAdd = function(req, res) {

  CrosverComment.create(req.body.postdata).then(crosver =>{
    sendJsonResponse(res, 200, crosver);
});
};

// Видалити коментар муфти
module.exports.crosverCommentDelete = function(req, res) {

  CrosverComment.destroy({where: {id: req.params.comment_id}}).then(() => {
      sendJsonResponse(res, 200);
  })
};



// Прикріпити Кабель до муфти
module.exports.addCrosverConnection = function(req, res) {

  CableCrosverConnection.create(req.body.postdata).then(crosver =>{
    sendJsonResponse(res, 200, crosver);
});
};


// Відкріпити Кабель від Муфти
module.exports.deleteCableCrosverConnection = function(req, res) {

  CableCrosverConnection.destroy({where: {id: req.params.connection_id}}).then(() => {
      sendJsonResponse(res, 200);
  })
};
