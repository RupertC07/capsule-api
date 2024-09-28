"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
const config_1 = __importDefault(require("./config"));
const Email_1 = require("./utils/CronJobs/Email");
const port = config_1.default.app.port;
(0, Email_1.StartEmailCron)();
app_1.default.listen(port, () => {
    console.log(`PORT IS ACTIVE AT ${port}`);
});
//# sourceMappingURL=server.js.map