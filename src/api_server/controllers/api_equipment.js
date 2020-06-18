const mysql = require('promise-mysql');
const Sequelize = require('sequelize');

const models = require('../models/sql_index');
const Converter = models.Converter;
const Presence = models.Presence;
const Sfp = models.Sfp;
const Battery = models.Battery;
const SystemPower = models.SystemPower;
const BatteryComment = models.BatteryComment;
const ConverterComment = models.ConverterComment;
const SfpComment = models.SfpComment;
const SystemPowerComment = models.SystemPowerComment;
const BatteryPresenceConnection = models.BatteryPresenceConnection;
const SfpPresenceConnection = models.SfpPresenceConnection;
const ConverterPresenceConnection = models.ConverterPresenceConnection;
const SystemPowerMegatazConnection = models.SystemPowerMegatazConnection;
const Megataz = models.Megataz;
const LittleSystemPower = models.LittleSystemPower;
const SystemPowerLittleSpConnection = models.SystemPowerLittleSpConnection;

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//Show list of Megataz
module.exports.ApiMegatazList = function (req, res) {
  Megataz.findAll(
    {
      include: [
        {
          model: SystemPowerMegatazConnection,
          include: [SystemPower]
        }
      ],
      order: [
        ['id', 'DESC']
      ]
    }
  ).then(Megataz => {
    sendJsonResponse(res, 200, Megataz);
  });
};

//Show list of little system powers
module.exports.ApiLittleSystemPowerList = (req, res) => {
  LittleSystemPower.findAll(
    {
      include: [
        // {
        //   model: SystemPowerComment
        // },
        {
          model: SystemPowerLittleSpConnection,
          include: [SystemPower]
        }
      ],
      order: [
        ['id', 'DESC']
      ]
    }
  ).then(LittleSystemPower => {
    sendJsonResponse(res, 200, LittleSystemPower);
  });
};










































