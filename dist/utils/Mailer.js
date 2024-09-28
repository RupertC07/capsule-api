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
const index_1 = __importDefault(require("../config/index"));
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer = require("nodemailer");
class Mailer {
    sendEmail(receiver, subject, data, templateName, plainText) {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                service: "Gmail", // Set to true if using port 465
                auth: {
                    user: index_1.default.smtp.email,
                    pass: index_1.default.smtp.password,
                },
            });
            let content = null;
            if (templateName) {
                const templatePath = path_1.default.resolve(__dirname, `../views/email/${templateName}.ejs`);
                const template = fs_1.default.readFileSync(templatePath, "utf8");
                // Render the EJS template with provided data
                content = ejs_1.default.render(template, { data });
            }
            if (!plainText && !content) {
                return reject(new Error("No content provided for email."));
            }
            const mailOptions = {
                from: "CAPSULE",
                to: receiver,
                subject: subject,
                text: plainText !== null && plainText !== void 0 ? plainText : undefined,
                html: content !== null && content !== void 0 ? content : undefined,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    reject(null); // Reject the promise if there's an error
                }
                else {
                    console.log("Email sent:", info.response);
                    resolve(true); // Resolve the promise if email sent successfully
                }
            });
        });
    }
    sendVScheduledEmail(email, subject, message, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = `${message} \n ${date}`;
            return yield this.sendEmail(email, subject, null, null, content);
        });
    }
}
exports.default = Mailer;
//# sourceMappingURL=Mailer.js.map