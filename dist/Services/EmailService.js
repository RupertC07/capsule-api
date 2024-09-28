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
const ScheduledEmailRepository_1 = __importDefault(require("../Repositories/ScheduledEmailRepository"));
const Mailer_1 = __importDefault(require("../utils/Mailer"));
const date_fns_1 = require("date-fns");
class EmailService {
    constructor() {
        this.email = new ScheduledEmailRepository_1.default();
        this.mailer = new Mailer_1.default();
    }
    schedule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduledEmail = yield this.email.create(data);
            return scheduledEmail;
        });
    }
    getPending(data, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const pending = this.email.pending(data, size);
            return pending;
        });
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date(data.createdAt);
            const readableDate = (0, date_fns_1.format)(date, "MMMM dd, yyyy");
            const transaction = yield this.mailer.sendVScheduledEmail(data.to, data.subject, data.text, readableDate);
            if (!transaction) {
                return null;
            }
            return yield this.email.setSent(data.id);
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=EmailService.js.map