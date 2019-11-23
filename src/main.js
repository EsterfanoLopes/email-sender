const nodemailer = require('nodemailer');
const template = require('./templates/template.js');
const csv = require('csvtojson/v1');
const schedule = require('node-schedule');

const testfile = './resources/test_list.csv';
//my test list
const prodfile = './resources/list.csv';
//path to our production list

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
  pool: true, //keeps the server connection open
  host: emailHost, //your email server
  port: emailPort, //gmail uses SSL
  secure: true, //gmail sends secure
  auth: {
    user: account.user,
    pass: account.pass
  }
});

let sendlist = [];
// empty array where we'll keep 
//all our contacts
let message_increment = 0;
//constiable to move to the next 
//contact

const trigger_sending = (env) => {
  //env passes our email and name to 
  //customize the message
  console.log(env);
  const emailbody = template.generate(env.first).toString();
  //generates a string to send 
  //the personalized HTML
  transporter.sendMail({
    from: 'Devin from At The Door <devin@atthedoor.app>',
    to: env.email, //email address of our recipient
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
    console.log(sendlist);
    trigger_sending(sendlist[message_increment]);
    if (message_increment < sendlist.length) {
      message_increment++;
      // if our increment is less than our list length, 
      // we'll keep sending
    }
    if (message_increment >= sendlist.length) {
      message_job.cancel();
      // stop our function when last message is sent
    }
  });
}

const getList = async () => {
  const jsonCsv = await csv().fromFile(prodfile)
  console.log(jsonCsv);
  sendlist.push(jsonCsv);
  set_message_delays();
};

const startApp = () => {
  transporter.verify(async (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
      await getList();
      // trigger the whole app once the mail server is ready
    }
  });
};

module.exports = {
  startApp,
};
