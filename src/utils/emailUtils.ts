import nodemailer from 'nodemailer';

import { values } from '../../key';
import { update_job } from './schedules.job';
const { email_password, sender_email } = values;

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: sender_email,
    pass: email_password,
  },
});

const emailSender = async (
  email: string,
  subject: string,
  html: any,
  attachments = null,
  property_id: string
): Promise<Boolean> => {
  let bool: boolean;
  try {
    console.log('About to send Email', email);

    let mailOptions = {
      from: sender_email,
      to: email,
      subject: subject,
      attachments,
      html,
    };

    await transporter.verify((err, success) => {
      if (err) {
        bool = false;
      }
    });

    await transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error ' + err);
        bool = false;
      } else {
        bool = true;
        console.log('Email sent successfully', bool);
        update_job(property_id);
        // return bool;
      }
    });
    console.log(bool);
    return bool;
  } catch (err) {
    console.error(err);
  }
};

export { emailSender };
