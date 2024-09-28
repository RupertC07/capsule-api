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
const client_1 = require("@prisma/client");
const client_2 = __importDefault(require("../utils/client"));
class ScheduledEmailRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_2.default.scheduledEmail.create({
                data,
            });
        });
    }
    pending(data, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_2.default.scheduledEmail.findMany({
                where: {
                    status: client_1.EmailStatus.PENDING,
                    scheduledTime: { lte: data.scheduledTime },
                },
                take: size,
            });
        });
    }
    setSent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pending = yield client_2.default.scheduledEmail.update({
                where: {
                    id: id,
                },
                data: {
                    status: client_1.EmailStatus.SENT,
                },
            });
            return pending;
        });
    }
}
exports.default = ScheduledEmailRepository;
//# sourceMappingURL=ScheduledEmailRepository.js.map