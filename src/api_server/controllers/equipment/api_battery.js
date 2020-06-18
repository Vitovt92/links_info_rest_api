const mysql = require('promise-mysql');
const Sequelize = require('sequelize');

const models = require('../../models/sql_index');

const Presence = models.Presence;
const Battery = models.Battery;
const BatteryComment = models.BatteryComment;
const BatteryPresenceConnection = models.BatteryPresenceConnection;

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};


//Show Battery inforvation
module.exports.ApiBatteryInfo = function (req, res) {
  Battery.findOne({
    where: { id: req.params.equipment_id },
    include: [
      {
        model: BatteryComment
      },
      {
        model: BatteryPresenceConnection,
        include: [Presence]
      }
    ]
  }).then(equipmentById => {
    sendJsonResponse(res, 200, equipmentById.dataValues);
  });
};


//Show list of Batterys
module.exports.ApiBatteryList = function (req, res) {
  Battery.findAll(
    {
      include: [
        {
          model: BatteryComment
        },
        {
          model: BatteryPresenceConnection,
          include: [Presence]
        }
      ],
      order: [
        ['id', 'DESC']
      ]
    }
  ).then(battery => {
    sendJsonResponse(res, 200, battery);
  });
};

//Form to add new Battery
module.exports.ApiBatteryNewPost = function (req, res) {
  Battery.create(req.body.postdata).then(battery => {
    let commentData = {
      batteryTableId: battery.id,
      textOfComment: "Акумулятор додано до бази",
      userOfComment: req.user.username,
    }
    BatteryComment.create(commentData).then(comment => {
      sendJsonResponse(res, 200, battery);  
    }); 
  });
};

//Post req to Edit battery DataBase
module.exports.batteryEditPost = function (req, res) {
  Battery.update(req.body.postData, {
    where: {
      id: req.params.equipment_id
    }
  }).then(equipment => {
    sendJsonResponse(res, 200, equipment);
  });
};

// Додати до Акумулятора коментар
module.exports.batteryCommentAdd = function (req, res) {
  BatteryComment.create(req.body.postdata).then(equipment => {
    sendJsonResponse(res, 200, equipment);
  });
};

// Видалити коментар battery
module.exports.batteryCommentDelete = function (req, res) {
  BatteryComment.destroy({ where: { id: req.params.comment_id } }).then(() => {
    sendJsonResponse(res, 200);
  })
};

// Видалити Акумулятор. (Відправити його у архів)
module.exports.batteryDeleteEquipment = function(req, res) {
  let postdata = {
    actual: 0
  }
  let commentData = {
    textOfComment: "Обладнання відправлено в утіль",
    userOfComment: req.user.username,
    batteryTableId: req.params.equipment_id
  }
  Battery.update(postdata, {
    where: {
      id: req.params.equipment_id
    }
  }).then(cable =>{
    BatteryComment.create(commentData).then(comment =>{
      sendJsonResponse(res, 200, cable);
    });  
  });
};

// Відминити видалення акумулятору. (Повернути із архіву)
module.exports.batteryDeleteEquipmentAbort = function(req, res) {
  let postdata = {
    actual: 1
  }
  let commentData = {
    textOfComment: "Обладнання повернуто із утілю.",
    userOfComment: req.user.username,
    batteryTableId: req.params.equipment_id
  }
  Battery.update(postdata, {
    where: {
      id: req.params.equipment_id
    }
  }).then(cable =>{
    BatteryComment.create(commentData).then(comment =>{
      sendJsonResponse(res, 200, cable);
    });  
  });
};


