const mysql = require('promise-mysql');
const Sequelize = require('sequelize');

const models = require('../../models/sql_index');

const Presence = models.Presence;
const Sfp = models.Sfp;
const SfpComment = models.SfpComment;
const SfpPresenceConnection = models.SfpPresenceConnection;

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};


//Show SFP inforvation
module.exports.ApiSfpInfo = function (req, res) {
  Sfp.findOne({
    where: { id: req.params.equipment_id },
    include: [
      {
        model: SfpComment
      },
      {
        model: SfpPresenceConnection,
        include: [Presence]
      }
    ]
  }).then(equipmentById => {
    sendJsonResponse(res, 200, equipmentById.dataValues);
  });
};

//Show list of Sfps
module.exports.ApiSfpList = function (req, res) {
  Sfp.findAll(
    {
      include: [
        {
          model: SfpComment
        },
        {
          model: SfpPresenceConnection,
          include: [Presence]
        }
      ],
      order: [
        ['id', 'DESC']
      ]
    }
  ).then(sfp => {
    sendJsonResponse(res, 200, sfp);
  });
};

//Form to add new Sfp
module.exports.ApiSfpNewPost = function (req, res) {
  Sfp.create(req.body.postdata).then(sfp => {
    let commentData = {
      sfpTableId: sfp.id,
      textOfComment: "SFP додано до бази",
      userOfComment: req.user.username,
    }
    SfpComment.create(commentData).then(comment => {
      sendJsonResponse(res, 200, sfp);  
    }); 
  });
};

//Post req to Edit sfp DataBase
module.exports.sfpEditPost = function (req, res) {
  Sfp.update(req.body.postData, {
    where: {
      id: req.params.equipment_id
    }
  }).then(equipment => {
    sendJsonResponse(res, 200, equipment);
  });
};

// Додати до SFP коментар
module.exports.sfpCommentAdd = function (req, res) {
  SfpComment.create(req.body.postdata).then(equipment => {
    sendJsonResponse(res, 200, equipment);
  });
};

// Видалити коментар SFP
module.exports.sfpCommentDelete = function (req, res) {
  SfpComment.destroy({ where: { id: req.params.comment_id } }).then(() => {
    sendJsonResponse(res, 200);
  })
};



