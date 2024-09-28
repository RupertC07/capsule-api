import cron from "node-cron";
import EmailService from "../../Services/EmailService";

export const StartEmailCron = async () => {
  cron.schedule("* * * * *", async () => {
    // console.log("*********Cron starting**********");
    const email = new EmailService();
    const date = new Date();

    const BATCH_SIZE = 10;
    const data = {
      scheduledTime: date,
    };

    try {
      const pending = await email.getPending(data, BATCH_SIZE);

      //   console.log(`There are ${pending.length} unsent emails.`);

      if (pending.length > 0) {
        for (const record of pending) {
          const send = await email.send(record);
          //   if (send) {
          //     console.log(`Ref:${record.reference} has been sent`);
          //   } else {
          //     console.log(`Ref:${record.reference} failed to send`);
          //   }
        }
        // console.log(`Pending emails : ${pending.length}`);
      } else {
        // console.log("No pending emails found");
      }
    } catch (error: any) {
      //   console.log(error);
    }
  });
};
