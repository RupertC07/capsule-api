import { EmailStatus, ScheduledEmail } from "@prisma/client";
import prisma from "../utils/client";

class ScheduledEmailRepository {
  async create(
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
    return await prisma.scheduledEmail.create({
      data,
    });
  }

  async pending(data: Pick<ScheduledEmail, "scheduledTime">, size: number) {
    return await prisma.scheduledEmail.findMany({
      where: {
        status: EmailStatus.PENDING,
        scheduledTime: { lte: data.scheduledTime },
      },
      take: size,
    });
  }

  async setSent(id: string) {
    const pending = await prisma.scheduledEmail.update({
      where: {
        id: id,
      },
      data: {
        status: EmailStatus.SENT,
      },
    });

    return pending;
  }
}

export default ScheduledEmailRepository;
