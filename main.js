const axios = require('axios');
const { JSDOM } = require('jsdom');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const url = 'https://lbkc.se/smorgasbutik/veckans-meny/';
sgMail.setApiKey(process.env.SG_API_KEY);

const dayNames = {
  1: 'Måndag',
  2: 'Tisdag',
  3: 'Onsdag',
  4: 'Torsdag',
  5: 'Fredag'
};

const getTodaysMenu = async () => {
  const today = dayNames[new Date().getDay()];
  const menuPromise = new Promise((resolve) => {
    axios.get(url).then((res) => {
      const { document } = new JSDOM(res.data).window;
      const dailyMenus = document.getElementsByTagName('h2');
      let todaysMenu;
      for (let i = 0; i < dailyMenus.length; i++) {
        if (dailyMenus[i].innerHTML.trim() == today) {
          todaysMenu = dailyMenus[i].parentNode.parentNode;
          break;
        }
      }
      resolve(todaysMenu.outerHTML);
    });
  });
  return menuPromise;
};

const getMessage = async () => {
  const todaysMenu = await getTodaysMenu();
  const msg = {
    to: process.env.SG_RECIPIENT,
    from: process.env.SG_SENDER,
    subject: 'Dagens lunch',
    html: todaysMenu
  };
  return msg;
};

const sendMessage = async () => {
  const msg = await getMessage();
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error('went wrong here', error);
    });
};

if (Object.keys(dayNames).includes(String(new Date().getDay()))) {
  sendMessage();
}
