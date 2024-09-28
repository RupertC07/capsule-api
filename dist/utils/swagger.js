"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = __importDefault(require("../config"));
const localUrl = config_1.default.url.local;
const forwardedUrl = config_1.default.url.forward;
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "NEX HK [HAWAK KAMAY SCHOLARS MANAGEMENT AND MONITORING SYSTEM REVAMP]",
            description: "API Documentaion",
            version: "2.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
                apiKeyAuth: {
                    type: "apiKey",
                    name: "x-api-key",
                    in: "header",
                },
            },
        },
        security: [
            {
                apiKeyAuth: [],
            },
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: localUrl, // Base URL for your API
                description: "Local development server",
            },
            {
                url: forwardedUrl, // Base URL for your API
                description: "Port Forward Url",
            }
        ],
    },
    apis: ["src/routers/*/*.ts"],
};
const spec = (0, swagger_jsdoc_1.default)(options);
const swagger = (app) => {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
};
exports.default = swagger;
//# sourceMappingURL=swagger.js.map