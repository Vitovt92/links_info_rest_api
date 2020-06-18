// const connectToBase = require('../models/sql_crosver');
const mysql = require('promise-mysql');
const Sequelize = require('sequelize');

const models = require('../models/sql_index');

const Cable = models.Cable;
const CableScanTechnicalCondition = models.CableScanTechnicalCondition;
const CableScanAct = models.CableScanAct;
const CableScanContract = models.CableScanContract;
const CableComment = models.CableComment;
const CableCoords = models.CableCoords;
const Crosver = models.Crosver;
const CableCrosverConnection = models.CableCrosverConnection;
const CableScanProject = models.CableScanProject;
const CableScanCartogram = models.CableScanCartogram;
const CableScanReservation = models.CableScanReservation;

const sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

//Show cable inforvation
module.exports.ApiCableInfo = function(req, res) {
    Cable.findOne({where: {id: req.params.cable_id},
                  include: [{
                    model: CableScanTechnicalCondition
                  },
                  {
                    model: CableScanReservation
                  },          
                  {
                    model: CableScanAct
                  },
                  {
                    model: CableScanContract
                  },
                  {
                    model: CableScanProject
                  },
                  {
                    model: CableScanCartogram
                  },
                  {
                    model: CableComment
                  },

                  {
                    model: CableCrosverConnection,
                    include: [Crosver]
                  }
                ],

    }).then(cableById => {

      sendJsonResponse(res, 200, cableById.dataValues);
  });
};

//Show list of Cables

module.exports.ApiCableList = function(req, res) {

    Cable.findAll({
                  include: [{
                    model: CableScanTechnicalCondition
                  },
                  {
                    model: CableScanAct
                  },
                  {
                    model: CableScanContract
                  },
                  {
                    model: CableComment
                  }
                ],
                order: [
                    ['id', 'DESC']
                ]
    }).then(cables =>{
      sendJsonResponse(res, 200, cables);
  });
};

//Form to add new Cable
module.exports.ApiCableNewPost = function(req, res) {
  Cable.create(req.body.postdata).then(cable =>{
    sendJsonResponse(res, 200, cable);
});
};

// //Post req to Edit Cable DataBase
module.exports.ApiCableEditPost = function(req, res) {
//  console.log('Api get req Edit crosver');
//  console.dir(req.body.postData);
//  console.log(req.params.cable_id);

  Cable.update(req.body.postData, {
    where: {
      id: req.params.cable_id
    }
  }).then(cable =>{
    sendJsonResponse(res, 200, cable);
  });
};

// // Додати до Кабелю коментар
module.exports.cableCommentAdd = function(req, res) {
//  console.log('Api get req add new comment');
//  console.dir(req.body.postdata);
  CableComment.create(req.body.postdata).then(cable =>{
    sendJsonResponse(res, 200, cable);
});
};

// // Видалити коментар до Кабелю
module.exports.cableCommentDelete = function(req, res) {
//  console.log('Api get req delete comment');

  CableComment.destroy({where: {id: req.params.comment_id}}).then(() => {
      sendJsonResponse(res, 200);
  })
};


// // Додати до Кабелю Координати
module.exports.cableAddCoords = function(req, res) {
  console.log('Api get req add new comment');
  console.dir(req.body.postdata);
  CableCoords.create(req.body.postdata).then(cable =>{
    sendJsonResponse(res, 200, cable);
});
};



// Редагувати координати

module.exports.cableUpdateCoords = function(req, res) {

  CableCoords.update(req.body.postData, {
    where: {
      id: req.params.coordsSerialNamber
    }
  }).then(cable =>{
    sendJsonResponse(res, 200, cable);
  });

};


// // Видалити Координату до Кабелю
module.exports.cableDeleteCoords = function(req, res) {

  CableCoords.destroy({where: {id: req.params.coordsSerialNamber}}).then(() => {
      sendJsonResponse(res, 200);
  })
};


// // Додати Муфту до кабелю
module.exports.addCrosverConnection = function(req, res) {

  CableCrosverConnection.create(req.body.postdata).then(cable =>{
    sendJsonResponse(res, 200, cable);
});
};


//  Відкріпити Кабель від Муфти
module.exports.deleteCableCrosverConnection = function(req, res) {
  console.log('Api get req delete coords');

  CableCrosverConnection.destroy({where: {id: req.params.connection_id}}).then(() => {
      sendJsonResponse(res, 200);
  })
};

// Видалити кабель. (Відправити його у архів)
module.exports.deleteCable = function(req, res) {
  let postdata = {
    actual: 0
  }
  let commentData = {
    textOfComment: "Кабель відправлено в архів",
    userOfComment: req.user.username,
    cableTableId: req.params.cable_id
  }
    Cable.update(postdata, {
    where: {
      id: req.params.cable_id
    }
  }).then(cable =>{
    CableComment.create(commentData).then(comment =>{
      sendJsonResponse(res, 200, cable);
    });  
  });
};

// Повернути кабель із архіву

module.exports.deleteCableAbort = function(req, res) {
  let postdata = {
    actual: 1
  }
  let commentData = {
    textOfComment: "Кабель повернено з архіву",
    userOfComment: req.user.username,
    cableTableId: req.params.cable_id
  }
    Cable.update(postdata, {
    where: {
      id: req.params.cable_id
    }
  }).then(cable =>{
    CableComment.create(commentData).then(comment =>{
      sendJsonResponse(res, 200, cable);
    });  
  });
};
