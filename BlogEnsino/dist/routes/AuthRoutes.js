"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const postRoutes = (0, express_1.Router)();
postRoutes.get('', AuthController_1.AuthController.generateToken);
exports.default = postRoutes;
