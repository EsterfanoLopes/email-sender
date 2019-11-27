const nodemailer = require('nodemailer');
const template = require('./templates/template.js');
const csv = require('csvtojson');
const path = require('path');
const { dataParser } = require('./util/dataParser');

const appDir = path.dirname(require.main.filename);
const prodfile = `${appDir}/resources/list.csv`;
const {
  userEmail,
  passwordEmail,
  emailPort,
  emailHost,
} = process.env;

const account = {
  user: userEmail,
  pass: passwordEmail,
};

const transporter = nodemailer.createTransport({
  pool: true,
  host: emailHost,
  port: emailPort,
  secure: true,
  auth: {
    user: account.user,
    pass: account.pass
  }
});

const sendEmail = ({ email, data }) => {
  if (email) {
    transporter.sendMail({
      from: 'E-mail sender <email@sender.com>',
      to: email,
      subject: 'Subjects of the e-mail',
      text: '##Plaintext version of the message##',
      html: template.generate(data).toString(),
    }, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
};

const triggerSending = (env) => {
  const parsedData = dataParser(env);
  parsedData.forEach(element => sendEmail(element));
};

const getList = async () => {
  try {
    const jsonCsv = await csv({
      noheader: true,
      output: "csv",
    }).fromFile(prodfile);
    await triggerSending(jsonCsv);
  } catch (err) {
    console.log(err);
  }
};

const startApp = () => {
  transporter.verify(async (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
      await getList();
    }
  });
};

module.exports = {
  startApp,
};
