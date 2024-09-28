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
exports.StartEmailCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const EmailService_1 = __importDefault(require("../../Services/EmailService"));
const StartEmailCron = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("*********Cron starting**********");
        const email = new EmailService_1.default();
        const date = new Date();
        const BATCH_SIZE = 10;
        const data = {
            scheduledTime: date,
        };
        try {
            const pending = yield email.getPending(data, BATCH_SIZE);
            //   console.log(`There are ${pending.length} unsent emails.`);
            if (pending.length > 0) {
                for (const record of pending) {
                    const send = yield email.send(record);
                    //   if (send) {
                    //     console.log(`Ref:${record.reference} has been sent`);
                    //   } else {
                    //     console.log(`Ref:${record.reference} failed to send`);
                    //   }
                }
                // console.log(`Pending emails : ${pending.length}`);
            }
            else {
                // console.log("No pending emails found");
            }
        }
        catch (error) {
            //   console.log(error);
        }
    }));
});
exports.StartEmailCron = StartEmailCron;
//# sourceMappingURL=Email.js.map