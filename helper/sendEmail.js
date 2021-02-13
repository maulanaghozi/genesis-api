const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

const sendBySendGrid = async params => {
  try {
    console.log("email send by sendgrid");
    await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: params.to,
      from: process.env.ADMIN_EMAIL,
      subject: params.subject,
      text: params.text || " ",
      html: params.html || "<div></div>",
    };
    console.log("checking params email before send ==> ", msg);
    await sgMail.send(msg);
  } catch (err) {
    console.log("error when sending email with send grid ", err.response.body);
  }
};

const sendByNodeMailer = async params => {
  try {
    console.log("email send by nodemailer");
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const msg = {
      to: params.to,
      from: `Genesis <${process.env.ADMIN_EMAIL}>`,
      subject: params.subject,
      text: params.text || " ",
      html: params.html || "<div></div>",
    };
    console.log("message ", msg);
    let info = await transporter.sendMail(msg);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log("error when sending email with nodemailer ", err);
  }
};

module.exports.send = params => {
  console.log(process.env.EMAIL_LIB);
  if (process.env.EMAIL_LIB === "SENDGRID") sendBySendGrid(params);
  else sendByNodeMailer(params);
};
