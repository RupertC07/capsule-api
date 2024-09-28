"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Test_1 = __importDefault(require("./Test"));
const Email_1 = __importDefault(require("./Email"));
const routes = express_1.default.Router();
routes.use("/", Test_1.default);
routes.use("/email", Email_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map