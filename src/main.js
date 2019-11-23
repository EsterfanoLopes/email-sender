const nodemailer = require('nodemailer');
const template = require('./templates/template.js');
const csv = require('csvtojson');
const schedule = require('node-schedule');

const path = require('path');
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

let sendlist = [];

const trigger_sending = (env) => {
  const emailbody = template.generate(env.first).toString();

  transporter.sendMail({
    from: 'Devin from At The Door <devin@atthedoor.app>',
    to: env,
    subject: 'Events and first impressions At The Door ',
    text: '##Plaintext version of the message##',
    html: emailbody,
  }, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};


const set_message_delays = () => {
  const message_job = schedule.scheduleJob('*/10 * * * * *', () => {
    let message_increment = 0;

    trigger_sending(sendlist[message_increment]);
    if (message_increment < sendlist.length) {
      message_increment++;
    }
    if (message_increment >= sendlist.length) {
      message_job.cancel();
    }
  });
}

const getList = async () => {
  try {
    const jsonCsv = await csv({
      noheader: true,
      output: "csv"
    }).fromFile(prodfile)
    sendlist.push(jsonCsv);
    set_message_delays();
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
