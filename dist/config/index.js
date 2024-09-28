"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    app: {
        port: process.env.PORT || 8080,
        env: process.env.PROJECT_ENV,
    },
    db: {},
    key: {
        secret: process.env.JWT_SECRET_KEY,
        x_key: process.env.API_KEY,
        refreshSecret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN,
        smtp_api_key: process.env.SMTP_API_KEY,
    },
    url: {
        local: `http://localhost:${process.env.PORT || 8000}/api/v2`,
        forward: `${process.env.PORT_FORWARD_URL}api/v2`,
    },
    smtp: {
        server: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        email: process.env.SMTP_EMAIL,
        password: process.env.SMTP_PASSWORD,
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map