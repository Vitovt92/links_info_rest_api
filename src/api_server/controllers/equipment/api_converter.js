const mysql = require('promise-mysql');
const Sequelize = require('sequelize');

const models = require('../../models/sql_index');
const Converter = models.Converter;
const Presence = models.Presence;
const ConverterComment = models.ConverterComment;
const ConverterPresenceConnection = models.ConverterPresenceConnection;


const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//Show Converter inforvation
module.exports.ApiConverterInfo = function (req, res) {
  Converter.findOne({
    where: { id: req.params.equipment_id },
    include: [
      {
        model: ConverterComment
      },
      {
        model: ConverterPresenceConnection,
        include: [Presence]
      }
    ]
  }).then(equipmentById => {
    sendJsonResponse(res, 200, equipmentById.dataValues);
  });
};

//Show list of Converters
module.exports.ApiConverterList = function (req, res) {
  Converter.findAll(
    {
      include: [
        {
          model: ConverterComment
        },
        {
          model: ConverterPresenceConnection,
          include: [Presence]
        }
      ],
      order: [
        ['id', 'DESC']
      ]
    }
  ).then(converter => {
    sendJsonResponse(res, 200, converter);
  });
};

//Form to add new Converter
module.exports.ApiConverterNewPost = function (req, res) {
  // add comment to converter that converter was added to db.    
  Converter.create(req.body.postdata.databaseOptions).then(converter => {
    let textOfCommentText = "Конвертер додано до бази."
    // if equipment is new write about it to comment
    if (req.body.postdata.additionalOptions.isEquipmentNew){
        textOfCommentText += " Обладнення нове!";
    }
    let commentData = {
        converterTableId: converter.id,
        textOfComment: textOfCommentText,
        userOfComment: req.user.username,
    }  
    ConverterComment.create(commentData).then(comment => {
      sendJsonResponse(res, 200, converter);  
    }); 
  });
};

//Post req to Edit converter DataBase
module.exports.converterEditPost = function (req, res) {
  Converter.update(req.body.postData, {
    where: {
      id: req.params.equipment_id
    }
  }).then(equipment => {
    sendJsonResponse(res, 200, equipment);
  });
};

// Додати до конвертера коментар
module.exports.converterCommentAdd = function (req, res) {
  ConverterComment.create(req.body.postdata).then(equipment => {
    sendJsonResponse(res, 200, equipment);
  });
};

// Видалити коментар Конвертера
module.exports.converterCommentDelete = function (req, res) {
  ConverterComment.destroy({ where: { id: req.params.comment_id } }).then(() => {
    sendJsonResponse(res, 200);
  })
};



