"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { NODE_ENV } = require("../variables/global");
const basename = path.basename(__filename);
const config = require(__dirname + "/../config/config.js");
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[NODE_ENV], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Define associations
db["Course"].hasMany(db["Week"], { foreignKey: "course_id" });
db["Week"].belongsTo(db["Course"], { foreignKey: "course_id" });

db["Week"].hasMany(db["Day"], { foreignKey: "week_id" });
db["Day"].belongsTo(db["Week"], { foreignKey: "week_id" });

db["Day"].hasMany(db["Grammar"], { foreignKey: "day_id" });
db["Grammar"].belongsTo(db["Day"], { foreignKey: "day_id" });

db["Grammar"].hasMany(db["GrammarExample"], { foreignKey: "grammar_id" });
db["GrammarExample"].belongsTo(db["Grammar"], { foreignKey: "grammar_id" });

db["Day"].hasMany(db["Kanji"], { foreignKey: "day_id" });
db["Kanji"].belongsTo(db["Day"], { foreignKey: "day_id" });

db["Kanji"].hasMany(db["KanjiWord"], { foreignKey: "kanji_id" });
db["KanjiWord"].belongsTo(db["Kanji"], { foreignKey: "kanji_id" });

db["Day"].hasMany(db["Video"], { foreignKey: "day_id" });
db["Video"].belongsTo(db["Day"], { foreignKey: "day_id" });

db["Video"].hasMany(db["VideoQuestion"], { foreignKey: "video_id" });
db["VideoQuestion"].belongsTo(db["Video"], { foreignKey: "video_id" });

db["VideoQuestion"].hasMany(db["VideoOption"], { foreignKey: "video_question_id" });
db["VideoOption"].belongsTo(db["VideoQuestion"], { foreignKey: "video_question_id" });

db["Day"].hasMany(db["Vocabulary"], { foreignKey: "day_id" });
db["Vocabulary"].belongsTo(db["Day"], { foreignKey: "day_id" });

db.Account.hasMany(db.CourseEnrollment, { foreignKey: "account_id" });
db.CourseEnrollment.belongsTo(db.Account, { foreignKey: "account_id" });

db.Course.hasMany(db.CourseEnrollment, { foreignKey: "course_id" });
db.CourseEnrollment.belongsTo(db.Course, { foreignKey: "course_id" });

db["Account"].hasMany(db["VocabularyProgress"], { foreignKey: "account_id" });
db["VocabularyProgress"].belongsTo(db["Account"], { foreignKey: "account_id" });

db["Vocabulary"].hasMany(db["VocabularyProgress"], { foreignKey: "vocabulary_id" });
db["VocabularyProgress"].belongsTo(db["Vocabulary"], { foreignKey: "vocabulary_id" });

db["Account"].hasMany(db["KanjiProgress"], { foreignKey: "account_id" });
db["KanjiProgress"].belongsTo(db["Account"], { foreignKey: "account_id" });

db["Kanji"].hasMany(db["KanjiProgress"], { foreignKey: "kanji_id" });
db["KanjiProgress"].belongsTo(db["Kanji"], { foreignKey: "kanji_id" });

db["Account"].hasMany(db["GrammarProgress"], { foreignKey: "account_id" });
db["GrammarProgress"].belongsTo(db["Account"], { foreignKey: "account_id" });

db["Grammar"].hasMany(db["GrammarProgress"], { foreignKey: "grammar_id" });
db["GrammarProgress"].belongsTo(db["Grammar"], { foreignKey: "grammar_id" });

db["Course"].belongsToMany(db["Exam"], {
  through: "CourseExam",
  foreignKey: "course_id",
  otherKey: "exam_id",
});
db["Exam"].belongsToMany(db["Course"], {
  through: "CourseExam",
  foreignKey: "exam_id",
  otherKey: "course_id",
});

db["Exam"].hasMany(db["ExamHistory"], { foreignKey: "exam_id" });
db["ExamHistory"].belongsTo(db["Exam"], { foreignKey: "exam_id" });

db["Account"].hasMany(db["ExamHistory"], { foreignKey: "account_id" });
db["ExamHistory"].belongsTo(db["Account"], { foreignKey: "account_id" });


module.exports = db;
