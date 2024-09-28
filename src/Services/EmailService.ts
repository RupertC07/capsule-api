import ScheduledEmailRepository from "../Repositories/ScheduledEmailRepository";
import { ScheduledEmail } from "@prisma/client";
import Mailer from "../utils/Mailer";
import { format } from "date-fns";

class EmailService {
  private email: ScheduledEmailRepository;
  private mailer: Mailer;
  constructor() {
    this.email = new ScheduledEmailRepository();
    this.mailer = new Mailer();
  }

  async schedule(
    data: Omit<
      ScheduledEmail,
      | "id"
      | "reference"
      | "createdAt"
      | "updatedAt"
      | "status"
      | "deletedAt"
      | "reference"
    >
  ) {
    const scheduledEmail = await this.email.create(data);
    return scheduledEmail;
  }

  async getPending(data: Pick<ScheduledEmail, "scheduledTime">, size: number) {
    const pending = this.email.pending(data, size);
    return pending;
  }

  async send(
    data: Pick<ScheduledEmail, "id" | "to" | "subject" | "text" | "createdAt">
  ) {
    const date = new Date(data.createdAt);

    const readableDate = format(date, "MMMM dd, yyyy");

    const transaction = await this.mailer.sendVScheduledEmail(
      data.to,
      data.subject,
      data.text,
      readableDate
    );

    if (!transaction) {
      return null;
    }
    return await this.email.setSent(data.id);
  }
}

export default EmailService;
