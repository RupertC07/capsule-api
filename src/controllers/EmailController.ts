import { Request, Response } from "express";
import EmailService from "../Services/EmailService";
import { ScheduledEmailSchema } from "../utils/zod";
import AppResponse from "../utils/AppResponse";
import { omit, pick } from "lodash";

class EmailController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const data = ScheduledEmailSchema.safeParse(req.body);

      if (data.error) {
        return AppResponse.sendError({
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

      const scheduledEmail = await this.emailService.schedule(emailToSchedule);

      return AppResponse.sendSuccess({
        res,
        data: {
          email: pick(scheduledEmail, [
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
    } catch (error: any) {
      console.log(error);
      return AppResponse.sendError({
        res,
        data: null,
        message: error.message,
        code: 500,
      });
    }
  };

  cron = async (req: Request, res: Response) => {
    try {
      await this.emailService.cron().then(() => {
        return AppResponse.sendSuccess({
          res,
          data: null,
          message: "Cron",
          code: 200,
        });
      });
    } catch (error: any) {
      console.log(error);
      return AppResponse.sendError({
        res,
        data: null,
        message: error.message,
        code: 500,
      });
    }
  };
}

export default EmailController;
