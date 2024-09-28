"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = __importDefault(require("../../controllers/default/testController"));
const apiKey_1 = __importDefault(require("../../middlewares/apiKey"));
const testRouter = express_1.default.Router();
const testController = new testController_1.default();
/**
 * @swagger
 * tags:
 *  name:Default
 *  description:Default Operation
 */
/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a message
 *     tags: [Default]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: A simple message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World!
 */
testRouter.get("/", apiKey_1.default, testController.index);
exports.default = testRouter;
//# sourceMappingURL=index.js.map