import config from "../config/index";
import ejs from "ejs";
import fs from "fs";
import path from "path";

const nodemailer = require("nodemailer");

class Mailer {
  private sendEmail(
    receiver: string,
    subject: string,
    data?: any,
    templateName?: string | null,
    plainText?: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: "Gmail", // Set to true if using port 465
        auth: {
          user: config.smtp.email,
          pass: config.smtp.password,
        },
      });

      let content: string | null = null;
      if (templateName) {
        const templatePath = path.resolve(
          __dirname,
          `../views/email/${templateName}.ejs`
        );

        const template = fs.readFileSync(templatePath, "utf8");

        // Render the EJS template with provided data
        content = ejs.render(template, { data });
      }

      if (!plainText && !content) {
        return reject(new Error("No content provided for email."));
      }
      const mailOptions = {
        from: "CAPSULE",
        to: receiver,
        subject: subject,
        text: plainText ?? undefined,
        html: content ?? undefined,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(null); // Reject the promise if there's an error
        } else {
          console.log("Email sent:", info.response);
          resolve(true); // Resolve the promise if email sent successfully
        }
      });
    });
  }

  async sendVScheduledEmail(
    email: string,
    subject: string,
    message: string,
    date: string
  ) {
    const content = `${message} \n ${date}`;
    return await this.sendEmail(email, subject, null, null, content);
  }
}

export default Mailer;
