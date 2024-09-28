"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, `${config_1.default.key.secret}`, {
        expiresIn: `${config_1.default.key.expiresIn}`,
    });
    return token;
};
exports.generateToken = generateToken;
const validateToken = (token) => {
    const validatedToken = jsonwebtoken_1.default.verify(token, `${config_1.default.key.secret}`);
    return validatedToken;
};
exports.validateToken = validateToken;
//# sourceMappingURL=token.js.map