const mysql = require('promise-mysql');
const Sequelize = require('sequelize');

const models = require('../../models/sql_index');

const Presence = models.Presence;
const SystemPower = models.SystemPower;

const SystemPowerMegatazConnection = models.SystemPowerMegatazConnection;
const Megataz = models.Megataz;
const SystemPowerComment = models.SystemPowerComment;
const LittleSystemPower = models.LittleSystemPower;
const SystemPowerLittleSpConnection = models.SystemPowerLittleSpConnection;

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//Show System Power inforvation
module.exports.ApiSystemPowerInfo = function (req, res) {
  SystemPower.findOne({
    where: { id: req.params.equipment_id },
    include: [
      {
        model: SystemPowerComment
      },
      {
        model: SystemPowerMegatazConnection,
        include: [Megataz]
      }
    ]
  }).then(equipmentById => {
    sendJsonResponse(res, 200, equipmentById.dataValues);
  });
};

//Show list of SystemPower
module.exports.ApiSystemPowerList = function (req, res) {
  console.log("got api systemPower list req");
  SystemPower.findAll(
    {
      include: [
        {
          model: SystemPowerComment
        },
        {
          model: SystemPowerMegatazConnection,
          include: [Megataz]
        }
      ],
      order: [
        ['id', 'DESC']
      ]
    }
  ).then(SystemPower => {
    sendJsonResponse(res, 200, SystemPower);
  });
};

//Form to add new SystemPower
module.exports.ApiSystemPowerNewPost = function (req, res) {
  SystemPower.create(req.body.postdata).then(SystemPower => {
    let commentData = {
      systemPowerTableId: SystemPower.id,
      textOfComment: "Блок живлення додано до бази",
      userOfComment: req.user.username,
    }
    SystemPowerComment.create(commentData).then(comment => {
      sendJsonResponse(res, 200, SystemPower);  
    }); 
   });
};

//Post req to Edit SystemPower DataBase
module.exports.SystemPowerEditPost = function (req, res) {
  SystemPower.update(req.body.postData, {
    where: {
      id: req.params.equipment_id
    }
  }).then(equipment => {
    sendJsonResponse(res, 200, equipment);
  });
};

// Додати до SystemPower коментар
module.exports.SystemPowerCommentAdd = function (req, res) {
  SystemPowerComment.create(req.body.postdata).then(equipment => {
    sendJsonResponse(res, 200, equipment);
  });
};

// Видалити коментар SystemPower
module.exports.SystemPowerCommentDelete = function (req, res) {
  SystemPowerComment.destroy({ where: { id: req.params.comment_id } }).then(() => {
    sendJsonResponse(res, 200);
  })
};

    
// Додати до бази запис про поєднання блока живлення і мегатаза
module.exports.addSystemPowerMegatazConnection = function (req, res) {
  SystemPowerMegatazConnection.create(req.body.postdata).then(connection => {
    let left_right = "Сторона: " + connection.left_right;
    let connection_comment;
    if (connection.connection_comment) {
      connection_comment = "Примітка: " + connection.connection_comment;
    } else {
      connection_comment = "";
    }
    let commentData = {
      textOfComment: left_right + " " + connection_comment,
      userOfComment: req.user.username,
      typeOfComment: 1,
      systemPowerTableId: connection.systemPowerTableId
    }
    Megataz.findOne({ where: { id: connection.megatazTableId } }).then(equipmentById => {
      commentData.additionalСolumn = equipmentById.alias;
      SystemPowerComment.create(commentData).then(equipment => { });
    });
    sendJsonResponse(res, 200, connection);
  });
}

// Відкріпити Блок живлення від мегатазу 
module.exports.deleteSystemPowerMegatazConnection = function (req, res) {
  let commentData = {
    userOfComment: req.user.username,
    typeOfComment: 2,
    systemPowerTableId: req.params.equipment_id
  }
  SystemPowerMegatazConnection.findOne({ where: { id: req.params.connection_id } }).then(connectionById => {
    Megataz.findOne({ where: { id: connectionById.megatazTableId } }).then(equipmentById => {
      commentData.textOfComment = equipmentById.alias;
      commentData.additionalСolumn = equipmentById.megatazTableId;
      SystemPowerComment.create(commentData).then(equipment => { });

    });
    SystemPowerMegatazConnection.destroy({ where: { id: req.params.connection_id } }).then(() => {
      sendJsonResponse(res, 200);
    })
  });
}
    
