"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResource = void 0;
class UserResource {
    constructor(username, role, id) {
        this.id = id || '';
        this.username = username;
        this.role = role;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.UserResource = UserResource;
