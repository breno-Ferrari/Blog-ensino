"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const UserResource_1 = require("../resources/UserResource");
class UserMapper {
    static mapToResource(user) {
        return new UserResource_1.UserResource(user.username, user.role, user.id);
    }
}
exports.UserMapper = UserMapper;
