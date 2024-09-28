"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = __importDefault(require("../Services/EmailService"));
const zod_1 = require("../utils/zod");
const AppResponse_1 = __importDefault(require("../utils/AppResponse"));
const lodash_1 = require("lodash");
class EmailController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = zod_1.ScheduledEmailSchema.safeParse(req.body);
                if (data.error) {
                    return AppResponse_1.default.sendError({
                        res,
                        data: null,
                        message: data.error.errors[0].message,
                        code: 400,
                    });
                }
                const emailToSchedule = {
                    to: data.data.to,
                    subject: data.data.subject,
                    text: data.data.text,
                    scheduledTime: new Date(data.data.scheduledTime),
                };
                const scheduledEmail = yield this.emailService.schedule(emailToSchedule);
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: {
                        email: (0, lodash_1.pick)(scheduledEmail, [
                            "reference",
                            "to",
                            "subject",
                            "text",
                            "scheduledTime",
                        ]),
                    },
                    message: "Your email has been scheduled",
                    code: 200,
                });
            }
            catch (error) {
                console.log(error);
                return AppResponse_1.default.sendError({
                    res,
                    data: null,
                    message: error.message,
                    code: 500,
                });
            }
        });
        this.emailService = new EmailService_1.default();
    }
}
exports.default = EmailController;
//# sourceMappingURL=EmailController.js.map