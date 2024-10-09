"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
const Post_1 = require("./Post");
const database_1 = __importDefault(require("../config/database"));
// testando ci/cd
const db = {
    User: User_1.User,
    Post: Post_1.Post,
};
User_1.User.initModel();
Post_1.Post.initModel();
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = database_1.default;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
