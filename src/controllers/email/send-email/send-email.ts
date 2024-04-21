import { HttpRequest, IController } from "../../protocols";
import { HttpResponse } from "../../protocols";
import { SendEmailParams } from "./protocols";
import nodemailer from "nodemailer";
import { badRequest, createLog, created, serverError } from "../../helpers";

export class SendEmailController implements IController {
  async handle(
    httpRequest: HttpRequest<SendEmailParams>
  ): Promise<HttpResponse<string>> {
    try {
      createLog(`Email send: ${JSON.stringify(httpRequest.body)}`);

      const requiredFields = ["subject", "to", "text"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof SendEmailParams]) {
          return badRequest(`O campo ${field} é obrigatório.`);
        }
      }

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "05b374cf409f14",
          pass: "58f4fd47e760f0",
        },
      });

      // Set email options
      const mailOptions = {
        from: "augusto.zeni@unvierso.univate.br",
        to: httpRequest.body?.to,
        subject: httpRequest.body?.subject,
        text: httpRequest.body?.text,
      };

      // Send the email
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return badRequest(`Email sending failed: ${error}`);
        }
      });

      return created<string>("Email sent.");
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
