
const path = require("path");
const bCrypt = require('bcrypt-nodejs');
const mysql = require('promise-mysql');
const Sequelize = require('sequelize');

// MODELS
const crosverModel = require('./crosver/crosver');
const crosverPhotoModel = require('./crosver/crosverPhoto');
const userModel = require('./user');
const crosverCommentModel = require('./crosver/crosver_comment');
const cableModel = require('./cable/cable');
const cableScanTechnicalConditionModel = require('./cable/cableScanTechnicalCondition');
const cableScanActModel = require('./cable/cableScanAct');
const cableScanContractModel = require('./cable/cableScanContract');
const cableScanProjectModel = require('./cable/cableScanProject');
const cableScanCartogramModel = require('./cable/cableScanCartogram');
const cableScanReservationModel = require('./cable/cableScanReservation');
const presenceModel = require('./presence/presence');
const presencePhotoModel = require('./presence/presencePhoto');
const presenceCommentModel = require('./presence/presence_comment');
const cableCommentModel = require('./cable/cable_comment');
const cableCoordsModel = require('./cable/cableCoords');
const converterModel = require('./equipment/converter');
const sfpModel = require('./equipment/sfp');
const batteryModel = require('./equipment/battery');
const batteryCommentModel = require('./equipment/battery_comment');
const converterCommentModel = require('./equipment/converter_comment');
const sfpCommentModel = require('./equipment/sfp_comment');
const systemPowerModel = require('./equipment/system_power');
const systemPowerCommentModel = require('./equipment/system_power_comment');
const megatazModel = require('./equipment/megataz');
const littleSystemPowerModel = require('./equipment/little_system_power');

const cableCrosverConnectionModel = require('./connections/cable_crosver_connection');
const batteryPresenceConnectionModel = require('./connections/battery_presence_connection');
const sfpPresenceConnectionModel = require('./connections/sfp_presence_connection');
const converterPresenceConnectionModel = require('./connections/converter_presence_connection');
const systemPowerMegatazConnectionModel = require('./connections/system_power_megataz_connection');
const systemPowerLittleSpConnectionModel = require('./connections/system_power_littleSp_connection');

const app = require("../../app");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', '..', 'config', 'config.json'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  },
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

const Crosver = crosverModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const CrosverPhoto = crosverPhotoModel(sequelize, Sequelize);
const CrosverComment = crosverCommentModel(sequelize, Sequelize);
const Cable = cableModel(sequelize, Sequelize);
const CableScanTechnicalCondition = cableScanTechnicalConditionModel(sequelize, Sequelize);
const CableScanAct = cableScanActModel(sequelize, Sequelize);
const CableScanContract = cableScanContractModel(sequelize, Sequelize);
const CableScanReservation = cableScanReservationModel(sequelize, Sequelize);
const CableScanProject = cableScanProjectModel(sequelize, Sequelize);
const CableScanCartogram = cableScanCartogramModel(sequelize, Sequelize);
const CableComment = cableCommentModel(sequelize, Sequelize);
const CableCoords = cableCoordsModel(sequelize, Sequelize);
const CableCrosverConnection = cableCrosverConnectionModel(sequelize, Sequelize);
const Presence = presenceModel(sequelize, Sequelize);
const PresencePhoto = presencePhotoModel(sequelize, Sequelize);
const PresenceComment = presenceCommentModel(sequelize, Sequelize);

const Converter = converterModel(sequelize, Sequelize);
const Sfp = sfpModel(sequelize, Sequelize);
const Battery = batteryModel(sequelize, Sequelize);
const BatteryComment = batteryCommentModel(sequelize, Sequelize);
const ConverterComment = converterCommentModel(sequelize, Sequelize);
const SfpComment = sfpCommentModel(sequelize, Sequelize);


const BatteryPresenceConnection = batteryPresenceConnectionModel(sequelize, Sequelize);
const SfpPresenceConnection = sfpPresenceConnectionModel(sequelize, Sequelize);
const ConverterPresenceConnection = converterPresenceConnectionModel(sequelize, Sequelize);

const SystemPower = systemPowerModel(sequelize, Sequelize);
const SystemPowerComment = systemPowerCommentModel(sequelize, Sequelize);
const Megataz = megatazModel(sequelize, Sequelize);
const LittleSystemPower = littleSystemPowerModel(sequelize, Sequelize);
const SystemPowerMegatazConnection = systemPowerMegatazConnectionModel(sequelize, Sequelize);
const SystemPowerLittleSpConnection = systemPowerLittleSpConnectionModel(sequelize, Sequelize);

// Фото Муфт
Crosver.hasMany(CrosverPhoto)
CrosverPhoto.belongsTo(Crosver);
// Коментарі муфт
Crosver.hasMany(CrosverComment);
CrosverComment.belongsTo(Crosver);
// Скани ТУ
Cable.hasMany(CableScanTechnicalCondition);
CableScanTechnicalCondition.belongsTo(Cable);
// Скани Актів
Cable.hasMany(CableScanAct);
CableScanAct.belongsTo(Cable);
// Скани договорів
Cable.hasMany(CableScanContract);
CableScanContract.belongsTo(Cable);
// Скани проектів
Cable.hasMany(CableScanProject);
CableScanProject.belongsTo(Cable);
// Скани картограм
Cable.hasMany(CableScanCartogram);
CableScanCartogram.belongsTo(Cable);
// Скани договорів Бронювання
Cable.hasMany(CableScanReservation);
CableScanReservation.belongsTo(Cable);
// Коментарі до кабелю
Cable.hasMany(CableComment);
CableComment.belongsTo(Cable);
// Координати кабелю
Cable.hasMany(CableCoords);
CableCoords.belongsTo(Cable);

// Майданчики ___________________________________

// Фото майданчиків
Presence.hasMany(PresencePhoto);
PresencePhoto.belongsTo(Presence);
//Коментарі майданчиків
Presence.hasMany(PresenceComment);
PresenceComment.belongsTo(Presence);

// Обладнення ____________________________________

// Коментарі Конвертера
Converter.hasMany(ConverterComment);
ConverterComment.belongsTo(Converter);
// Коментарі Акумулюятора
Battery.hasMany(BatteryComment);
BatteryComment.belongsTo(Battery);
// Коментарі SFP
Sfp.hasMany(SfpComment);
SfpComment.belongsTo(Sfp);
// Коментарі БП-шників
SystemPower.hasMany(SystemPowerComment);
SystemPowerComment.belongsTo(SystemPower);

// connections _____________________________

// Поєднання Кабелю із муфтою
CableCrosverConnection.belongsTo(Cable);
CableCrosverConnection.belongsTo(Crosver);
Cable.hasMany(CableCrosverConnection);
Crosver.hasMany(CableCrosverConnection);

// Поєднання Акумулятора і Майданчика
BatteryPresenceConnection.belongsTo(Battery);
BatteryPresenceConnection.belongsTo(Presence);
Battery.hasMany(BatteryPresenceConnection);
Presence.hasMany(BatteryPresenceConnection);

// Поєднання SFP і майданчика
SfpPresenceConnection.belongsTo(Sfp);
SfpPresenceConnection.belongsTo(Presence);
Sfp.hasMany(SfpPresenceConnection);
Presence.hasMany(SfpPresenceConnection);

// Поєднання Конвертера і майданчика
ConverterPresenceConnection.belongsTo(Converter);
ConverterPresenceConnection.belongsTo(Presence);
Converter.hasMany(ConverterPresenceConnection);
Presence.hasMany(ConverterPresenceConnection);

// Поєднання БП-шніка і Мегатаза
SystemPowerMegatazConnection.belongsTo(SystemPower);
SystemPowerMegatazConnection.belongsTo(Megataz);
SystemPower.hasMany(SystemPowerMegatazConnection);
Megataz.hasMany(SystemPowerMegatazConnection);

// Поєднання БП-шніка і маленького БПшнічка

SystemPowerLittleSpConnection.belongsTo(SystemPower);
SystemPowerLittleSpConnection.belongsTo(LittleSystemPower);
SystemPower.hasMany(SystemPowerLittleSpConnection);
LittleSystemPower.hasMany(SystemPowerLittleSpConnection);

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
// check thet add connected to DB
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync();


//Megataz.sync({force: false}).then(() => {
//  Megataz.create({
//    alias: "megatazik 1",
//  });
//})

// SystemPowerLittleSpConnection.sync({ force: true }).then(() => {
//   SystemPowerLittleSpConnection.create({
//     server_alias: "test"
//   });
// })

// SystemPowerMegatazConnection.sync({ alter: true }).then(() => {
//   //  SystemPowerMegatazConnection.create({
//   //    systemPowerTableId: 2,
//   //    megatazTableId: 1,
//   //    left_right: 0
//   //  });
// })

// LittleSystemPower.sync({force: true}).then(() => {
//   LittleSystemPower.create({
//     comment: ""
//   });
// })

CableScanReservation.sync({ alter: true }).then(() => {})
Battery.sync({ alter: true }).then(() => {})
Cable.sync({ alter: true }).then(() => {})
//SystemPowerMegatazConnection.sync({ alter: true }).then(() => {})

// cableInfo.cable.forEach(function(cableElement) {
//   console.log(element);
// });


// cableInfo.cable.forEach(function(cableElement) {
//   Cable.sync({force: false}).then(() => {
//     Cable.create({
//       cablePointNameA: cableElement.urid.pochAdr,
//       cablePointNameB: cableElement.urid.kincAdr,
//       cableTechnicalConditions: cableElement.urid.tu.doc,
//       cableAct: cableElement.urid.akt.doc,
//       cableContract: cableElement.urid.dog.doc,
//       cableComments: "",
//       folder: cableElement.urid.papka
//     })
// })
// });

// CableCoords.sync({force: false}).then(() => {
//   var cableCounter = 15;
//   cableInfo.cable.forEach(function(cableElement) {
//     var serialNumber = 1
//     cableElement.fiz.path.forEach(function(urlImage) {
//       console.log(urlImage);
//       var serialNumber = 1
//         CableCoords.create({
//           serialNumber: serialNumber,
//           lat: urlImage.coords[0],
//           lng:  urlImage.coords[1],
//           comment: urlImage.what,
//           cableTableId: cableCounter
//         })
//         serialNumber++
//     });
//     cableCounter++
//   });
// })
//     CableCoords.sync({force: true}).then(() => {
//       CableCoords.create({
//         serialNumber: 1,
//         lat: "50.435614",
//         lng: "30.525576",
//         comment: "т.к. №98",
//         cableTableId: 1
//       })
//
// CableScanCartogram.sync({force: true}).then(() => {
//   CableScanCartogram.create({
//     scanCartogramName : "tectCartogram.png",
//     cableTableId: 1
//   })
// })


// BatteryPresenceConnection.sync({force: true}).then(() => {
//   BatteryPresenceConnection.create({
//     batteryTableId: 1,
//     presenceTableId: 1,
//     connection_comment: 'Тестовий коментар'
//   })
// })
//
// ConverterPresenceConnection.sync({force: true}).then(() => {
//   ConverterPresenceConnection.create({
//     converterTableId: 1,
//     presenceTableId: 1,
//     connection_comment: 'абонент Laci Фоп'
//   })
// })
//
// SfpPresenceConnection.sync({force: true}).then(() => {
//   SfpPresenceConnection.create({
//     sfpTableId: 1,
//     presenceTableId: 1,
//     connection_comment: 'абонент test Фоп'
//   })
// })
// BatteryComment.sync({force: true}).then(() => {
//   BatteryComment.create({
//     batteryTableId: 1,
//     userOfComment: "Vitovt",
//     textOfComment: "Батарейка проверена. Держит 2 часа"
//   });
// })

// ConverterComment.sync({force: true}).then(() => {
//   ConverterComment.create({
//     converterTableId: 1,
//     userOfComment: "Vitovt",
//     textOfComment: "Конвертер проверен. ОК"
//   });
// })
//
// SfpComment.sync({force: true}).then(() => {
//   SfpComment.create({
//     sfpTableId: 1,
//     userOfComment: "Vitovt",
//     textOfComment: "SFP проверен. ОК"
//   });
// })
//
//
// Battery.sync({force: true}).then(() => {
//   Battery.create({
//     Model: "test-Battery-TYPE",
//     capacity: "55",
//     sfpRange: "10",
//     comment: "Тестовий коментар"
//
//   });
//
// })
//
// Sfp.sync({force: true}).then(() => {
//   Sfp.create({
//     sfpModel: "testModel-6-534a",
//     sfpType: "A",
//     sfpRange: "10",
//     sfpComments: "test sfp",
//     speed: "1000",
//     connectionType: "SC"
//
//   });
//
// })
//
// Converter.sync({force: true}).then(() => {
//   Converter.create({
//     converterModel: "testModel-6-534a",
//     converterType: "A",
//     converterRange: "10",
//     speed: "100"
//
//   });
//
// })
//
// PresenceComment.sync({force: true}).then(() => {
//   PresenceComment.create({
//     userOfComment: "Vitovt",
//     textOfComment: "Test and rest",
//     presenceTableId: 1
//
//   });
//
// })
//
// // PresencePhoto.sync({force: true}).then(() => {
// //   PresencePhoto.create({
// //     photoName: "rose-3142529__340.jpg",
// //     presenceTableId: 1
// //
// //   });
// //
// // })
// //
// // Presence.sync({force: true}).then(() => {
// //   Presence.create({
// //     presenceLocation: "Велика Васильківська 28",
// //     presenceComments: "Тестуємо Точки присутності",
// //     lat: 50.438588,
// //     lng: 30.515682
// //   });
// //   Presence.create({
// //     presenceLocation: "Велика Васильківська 5 (Мандарин Плаза)",
// //     presenceComments: "Тестуємо Точки присутності 2",
// //     lat: 50.441205,
// //     lng: 30.520403
// //   })
// // })
//
// CableScanProject.sync({force: true}).then(() => {
//   CableScanProject.create({
//     scanProjectName: "testProgect.png",
//     cableTableId: 1
//   })
// })
//
// CableScanCartogram.sync({force: true}).then(() => {
//   CableScanCartogram.create({
//     scanCartogramName : "tectCartogram.png",
//     cableTableId: 1
//   })
// })
//
//
//
// CableCrosverConnection.sync({force: true}).then(() => {
//   CableCrosverConnection.create({
//     cableTableId: 1,
//     crosverTableId: 1
//   })
//   CableCrosverConnection.create({
//     cableTableId: 1,
//     crosverTableId: 2
//   })
//   CableCrosverConnection.create({
//     cableTableId: 1,
//     crosverTableId: 3
//   })
//   CableCrosverConnection.create({
//     cableTableId: 4,
//     crosverTableId: 2
//   })
//   CableCrosverConnection.create({
//     cableTableId: 5,
//     crosverTableId: 2
//   })
// })
//     CableCoords.sync({force: true}).then(() => {
//       CableCoords.create({
//         serialNumber: 1,
//         lat: "50.435614",
//         lng: "30.525576",
//         comment: "т.к. №98",
//         cableTableId: 1
//       })
//       CableCoords.create({
//         serialNumber: 2,
//         lat: "-27.467",
//         lng: "153.027",
//         comment: "т.к. №125",
//         cableTableId: 1
//       })
//     })
//
//     CableComment.sync({force: true}).then(() => {
//       CableComment.create({
//         userOfComment: "Vitovt",
//         textOfComment: "my test comment",
//         cableTableId: 1
//       })
//     })
//
//         CableScanTechnicalCondition.sync({force: true}).then(() => {
//           CableScanTechnicalCondition.create({
//             scanTechnicalConditionsName: "47326150_2249068708444954_5054446341476843520_n.jpg",
//             cableTableId: 1
//           })
//     })
//     CableScanAct.sync({force: true}).then(() => {
//       CableScanAct.create({
//         scanActsName: "1448881894_cute-kitty-360x640.jpg",
//         cableTableId: 1
//       })
// })
// CableScanContract.sync({force: true}).then(() => {
//   CableScanContract.create({
//     scanContractsName: "1532691638_2.jpg",
//     cableTableId: 1
//   })
// })
// //     Cable.sync({force: true}).then(() => {
// //       Cable.create({
// //         cablePointNameA: "Т.К. №657 по вул. Велика Васельківська",
// //         cablePointNameB: "будинок 28 по вул. Предславинська",
// //         cableTechnicalConditions: "4-8765 від 09.04.2019 р.",
// //         cableAct: "№ 498 від 04.06.2020 р.",
// //         cableContract: "",
// //         cableComments: "",
// //         folder: "Т-8"
// //       })
// // })
//     // User.sync({force: true}).then(() => {
//     //   // Table created
//     //   var testpass = bCrypt.hashSync("test", bCrypt.genSaltSync(8), null)
//     //   return User.create({
//     //     username: 'test',
//     //     password: testpass
//     //   });
//     // });
//     //
//     // CrosverPhoto.sync({force: true}).then(() => {
//     //   CrosverPhoto.create({
//     //     photoName: '23.2.2019crosver_id_1_(48.31)Декард_Каин.jpg',
//     //     crosverTableId: 1
//     //   })
//     //   return   CrosverPhoto.create({
//     //     photoName: '27.2.2019crosver_id_2_(54.15)1463667593112291751.jpg',
//     //     crosverTableId: 1
//     //   }).then(() => {
//     //
//     //
//     //   })
//     // });


module.exports = {
  Crosver: Crosver,
  User: User,
  CrosverPhoto: CrosverPhoto,
  CrosverComment: CrosverComment,
  Cable: Cable,
  CableScanTechnicalCondition: CableScanTechnicalCondition,
  CableScanAct: CableScanAct,
  CableScanContract: CableScanContract,
  CableComment: CableComment,
  CableCoords: CableCoords,
  CableCrosverConnection: CableCrosverConnection,
  CableScanProject: CableScanProject,
  CableScanCartogram: CableScanCartogram,
  Presence: Presence,
  PresencePhoto: PresencePhoto,
  PresenceComment: PresenceComment,
  Converter: Converter,
  Sfp: Sfp,
  Battery: Battery,
  SystemPower: SystemPower,
  BatteryComment: BatteryComment,
  ConverterComment: ConverterComment,
  SfpComment: SfpComment,
  SystemPowerComment: SystemPowerComment,
  BatteryPresenceConnection: BatteryPresenceConnection,
  SfpPresenceConnection: SfpPresenceConnection,
  ConverterPresenceConnection: ConverterPresenceConnection,
  SystemPowerMegatazConnection: SystemPowerMegatazConnection,
  Megataz: Megataz,
  LittleSystemPower: LittleSystemPower,
  SystemPowerLittleSpConnection: SystemPowerLittleSpConnection,
  CableScanReservation: CableScanReservation
};
