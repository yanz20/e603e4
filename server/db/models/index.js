const User = require("./user");
const User_Group = require("./user_group");
const Group = require("./group");
const Message = require("./message");
const Message_Recipient = require("./message_recipient");

// associations

User.hasMany(Message);
Message.belongsTo(User, { as: "sender_id"});
User.hasMany(Message_Recipient);
User.belongsToMany(Group, { through: User_Group});
Group.belongsToMany(User, { through: User_Group});
User_Group.hasMany(Message_Recipient);
Message_Recipient.belongsTo(User_Group, { as: "recipient_group_id"});
Message.hasMany(Message_Recipient);
Message_Recipient.belongsTo(Message);

module.exports = {
  User,
  User_Group,
  Group,
  Message,
  Message_Recipient
};
