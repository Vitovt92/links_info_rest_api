const mysql = require('promise-mysql');
const Sequelize = require('sequelize');

const models = require('../models/sql_index');
const SystemPower = models.SystemPower;
const SystemPowerComment = models.SystemPowerComment;
const SystemPowerMegatazConnection = models.SystemPowerMegatazConnection;
const Megataz = models.Megataz;
const SystemPowerLittleSpConnection = models.SystemPowerLittleSpConnection;
const LittleSystemPower = models.LittleSystemPower;

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

// add Server to system power
module.exports.addNewServerToSystemPower = (req, res) => {
  SystemPowerLittleSpConnection.create(req.body.postdata).then(element => {
    sendJsonResponse(res, 200, element);

  });
};

// create new little system power
module.exports.ApilittleSystemPowerAddNew = (req, res) => {
  LittleSystemPower.create(req.body.postdata).then(element => {
    sendJsonResponse(res, 200, element);
  });
};
