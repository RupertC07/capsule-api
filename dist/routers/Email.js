"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmailController_1 = __importDefault(require("../controllers/EmailController"));
const emailRouter = (0, express_1.Router)();
const emailController = new EmailController_1.default();
emailRouter.post("/schedule", emailController.create);
exports.default = emailRouter;
//# sourceMappingURL=Email.js.map