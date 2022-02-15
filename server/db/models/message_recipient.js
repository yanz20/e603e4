const Sequelize = require("sequelize");
const db = require("../db");

const Message_Recipient = db.define("message_recipient", {
  is_read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Message_Recipient;