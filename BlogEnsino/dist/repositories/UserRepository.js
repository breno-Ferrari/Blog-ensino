"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../models/User");
class UserRepository {
    findAll() {
        return User_1.User.findAll();
    }
    findById(id) {
        return User_1.User.findByPk(id);
    }
    findByUsername(username) {
        return User_1.User.findOne({ where: { username: username } });
    }
    create(username, role) {
        if (!role || !username) {
            return Promise.reject(new Error('Role and Username são necessarios'));
        }
        return User_1.User.create({ username, role });
    }
    update(user, fields) {
        return user.update(fields);
    }
    delete(user) {
        return user.destroy();
    }
}
exports.UserRepository = UserRepository;
