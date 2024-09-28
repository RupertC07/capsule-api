// prisma/seed.ts
import { EmailStatus } from "@prisma/client";
import prisma from "../src/utils/client";

async function main() {
  // Example scheduled emails

  await prisma.scheduledEmail.deleteMany();
  const scheduledEmails = [
    {
      to: "user1@example.com",
      subject: "Welcome to Capsule!",
      text: "Thank you for signing up for Capsule. Your first scheduled email is here!",
      scheduledTime: new Date("2024-09-29T10:00:00Z"),
      status: "PENDING",
    },
    {
      to: "user2@example.com",
      subject: "Your Weekly Update",
      text: "Here is your weekly update from Capsule. Stay tuned!",
      scheduledTime: new Date("2024-09-30T12:00:00Z"),
      status: "PENDING",
    },
    {
      to: "user3@example.com",
      subject: "Monthly Newsletter",
      text: "Catch up with the latest news and updates from Capsule.",
      scheduledTime: new Date("2024-10-01T09:00:00Z"),
      status: "PENDING",
    },
  ];

  // Insert scheduled emails into the database
  for (const email of scheduledEmails) {
    await prisma.scheduledEmail.create({
      data: {
        to: email.to,
        subject: email.subject,
        text: email.text,
        scheduledTime: email.scheduledTime,
        status: EmailStatus.PENDING,
      },
    });
  }

  console.log("Scheduled emails seeded successfully!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
