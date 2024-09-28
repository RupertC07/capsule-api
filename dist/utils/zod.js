"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledEmailSchema = void 0;
const zod_1 = require("zod");
exports.ScheduledEmailSchema = zod_1.z.object({
    to: zod_1.z.string().email(), // Validate email format
    subject: zod_1.z.string().min(1, "Subject is required"), // Subject must be at least 1 character
    text: zod_1.z.string().min(1, "Email body content is required"), // Body content is required
    scheduledTime: zod_1.z
        .string()
        .refine((value) => {
        const date = new Date(value);
        const now = new Date();
        const fiveMinutesAhead = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes ahead of now
        return date > fiveMinutesAhead;
    }, {
        message: "Scheduled time must be at least 5 minutes in the future",
    })
        .transform((value) => new Date(value)), // Convert to Date object
});
//# sourceMappingURL=zod.js.map