import nodemailer from "nodemailer";
import { IEmail } from "../interface/interface";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "shakil102043@gmail.com",
    pass: "tlyt kcud cakk pyfb",
  },
});

const sendEmail = async ({
  from = "shakil102043@gmail.com",
  to,
  subject,
  text,
  html,
}: IEmail) => {
  const info = await transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  // eslint-disable-next-line no-console
  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;
