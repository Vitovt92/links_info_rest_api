// var connectToBase = require('../models/sql_crosver');
var mysql = require('promise-mysql');
var Sequelize = require('sequelize');

var models = require('../models/sql_index');
var Presence = models.Presence;
var PresencePhoto = models.PresencePhoto;
var PresenceComment = models.PresenceComment;

var Converter = models.Converter;
var Sfp = models.Sfp;
var Battery =  models.Battery;
var BatteryPresenceConnection = models.BatteryPresenceConnection;
var SfpPresenceConnection = models.SfpPresenceConnection;
var ConverterPresenceConnection = models.ConverterPresenceConnection;

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

//Show presence inforvation
module.exports.ApiPresenceInfo = function(req, res) {
    Presence.findOne({where: {id: req.params.presence_id},
                  include: [{
                              model: PresencePhoto
                            },
                            {
                              model: PresenceComment
                            },
                            {
                              model: ConverterPresenceConnection,
                              include: [Converter]
                            },
                            {
                              model: SfpPresenceConnection,
                              include: [Sfp]
                            },
                            {
                              model: BatteryPresenceConnection,
                              include: [Battery]
                            }

                ]
    }).then(crosverById => {
        console.dir(crosverById);
      sendJsonResponse(res, 200, crosverById.dataValues);
  });
};

// //Show list of presence

module.exports.ApiPresenceList = function(req, res) {

    Presence.findAll({include: [{
                                    model: PresencePhoto
                                },
                                {
                                    model: PresenceComment
                                },
                                {
                                  model: ConverterPresenceConnection,
                                  include: [Converter]
                                },
                                {
                                  model: SfpPresenceConnection,
                                  include: [Sfp]
                                },
                                {
                                  model: BatteryPresenceConnection,
                                  include: [Battery]
                                }
                              ],
                              order: [
                                  ['id', 'DESC']
                              ]

}).then(presence =>{
      sendJsonResponse(res, 200, presence);
  });
};

//Form to add new presence
module.exports.ApiPresenceNewPost = function(req, res) {
  Presence.create(req.body.postdata).then(presence =>{
    sendJsonResponse(res, 200, presence);
});
};
//Post req to Edit Crosver DataBase
module.exports.ApiPresenceEditPost = function(req, res) {
  Presence.update(req.body.postData, {
    where: {
      id: req.params.presence_id
    }
  }).then(presence =>{
    sendJsonResponse(res, 200, presence);
  });

};

// Додати до Точки присутності коментар
module.exports.presenceCommentAdd = function(req, res) {
  PresenceComment.create(req.body.postdata).then(presence =>{
    sendJsonResponse(res, 200, presence);
});
};

// Видалити коментар Точки присутності
module.exports.presenceCommentDelete = function(req, res) {
  PresenceComment.destroy({where: {id: req.params.comment_id}}).then(() => {
      sendJsonResponse(res, 200);
  })
};

// Прикріпити конвертер до майданчика
module.exports.addConverterConnection = function(req, res) {

  ConverterPresenceConnection.create(req.body.postdata).then(presence =>{
    sendJsonResponse(res, 200, presence);
});
};


// ПРикріпити SFP до майданчика
module.exports.addSfpConnection = function(req, res) {

  SfpPresenceConnection.create(req.body.postdata).then(presence =>{
    sendJsonResponse(res, 200, presence);
});
};

// ПРикріпити аккумулятора до майданчика
module.exports.addBatteryConnection = function(req, res) {

  BatteryPresenceConnection.create(req.body.postdata).then(presence =>{
    sendJsonResponse(res, 200, presence);
});
};

// Відкріпити Конвертер від майданчика
module.exports.deleteConverterPresenceConnection = function(req, res) {

  ConverterPresenceConnection.destroy({where: {id: req.params.connection_id}}).then(() => {
      sendJsonResponse(res, 200);
  })
};

// Відкріпити SFP від майданчика
module.exports.deleteSfpPresenceConnection = function(req, res) {

   SfpPresenceConnection.destroy({where: {id: req.params.connection_id}}).then(() => {
      sendJsonResponse(res, 200);
  })
};

// Відкріпити Акумулятор від майданчика
module.exports.deleteBatteryPresenceConnection = function(req, res) {

   BatteryPresenceConnection.destroy({where: {id: req.params.connection_id}}).then(() => {
      sendJsonResponse(res, 200);
  })
};
// // Прикріпити Кабель до муфти
// module.exports.addCrosverConnection = function(req, res) {
//   console.log('Api get req add new comment');
//   console.dir(req.body.postdata);
//   CableCrosverConnection.create(req.body.postdata).then(crosver =>{
//     sendJsonResponse(res, 200, crosver);
// });
// };
//
//
// // Відкріпити Кабель від Муфти
// module.exports.deleteCableCrosverConnection = function(req, res) {
//   console.log('Api get req add new comment');
//   console.dir(req.body.postdata);
//   CableCrosverConnection.destroy({where: {id: req.params.connection_id}}).then(() => {
//       sendJsonResponse(res, 200);
//   })
// };
