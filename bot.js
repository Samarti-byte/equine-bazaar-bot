const Discord = require("discord.js");
const client = new Discord.Client();
require('http').createServer().listen(3000);
 
// Set the prefix
let prefix = "!";
// prefix remove role
let prefixRem = "-"; 
let count = 0; 

let messageID = 0; 
var msgRoleName = ""; 

// remove users from role
client.on("message", (message) => {
    if(message.content.startsWith(":(")) {
        message.channel.send(":sob:"); 
    }
  if (message.content.startsWith(prefixRem)) {
    if(!message.member.hasPermission('MANAGE_ROLES')) {
    message.channel.send("You do not have permission to run this command."); 
    return; 
    }
    let parts = message.content.substr(1);
    // message.channel.send(parts); 
    let upp = parts.toUpperCase();
    // message.channel.send(upp); 
    if (!message.guild.roles.find(t => t.name == upp)) { 
        message.channel.send("Can't find role " + upp + ".").then(message => 
        message.delete(3000));
        message.delete();
        return; 
    }
      let role = message.guild.roles.find(t => t.name == upp)
      message.guild.members.forEach(member => {
        if(!member.roles.find(t => t.name == upp)) return;
        else { member.removeRole(role.id);
        count++; 
        }
      })
      if(count == 0) {
        message.channel.send("No users in role " + upp + ".").then(message => 
        message.delete(3000)); 
        message.delete();
        return; 
      }
      message.channel.send("Cleared role " + upp + ".").then(message => 
        message.delete(3000));
      message.delete();  
  }
});

// create new reaction message: role name
client.on("message", (message) => {
  if (message.content.startsWith(prefix)) {
    msgRoleName = message.content.substr(1);

    if (!message.guild.roles.find(t => t.name == msgRoleName.toUpperCase())) { 
        message.channel.send("Can't find role " + msgRoleName + "."); 
        return; 
    }

    message.delete(); 

    const embed = new Discord.RichEmbed()
	.setColor('#cfcfe2')
	.setTitle('Enable notifications for this auction')
	.setAuthor('HR Horse Market', 'https://i.imgur.com/Zun46mX.png')
  .setDescription('*React to this message to receive notifications for this auction lot.*')
  .setFooter(msgRoleName.toUpperCase());

// emoji reaction: message.react(client.emojis.get("123123123123"))
var lEmoji; 

switch(msgRoleName) {
    case "sam1": lEmoji = "639266737422073856"; 
    break; 
    case "sam2": lEmoji = "639302188795035659"; 
    break; 
    case "sam3": lEmoji = "639266735689826339"; 
    break; 

    case "sane1": lEmoji = "639410098078220299"; 
    break; 
    case "sane2": lEmoji = "639410098300518407"; 
    break; 
    case "sane3": lEmoji = "639410098401443875"; 
    break; 

    case "rey1": lEmoji = "639254232427659265"; 
    break; 
    case "rey2": lEmoji = "639254232914067459"; 
    break; 
    case "rey3": lEmoji = "639254232645763094"; 
    break; 
    case "rey4": lEmoji = "639254232821792769"; 
    break; 
    case "rey5": lEmoji = "639254233186828288"; 
    break; 

    case "blah1": lEmoji = "639409067499978762"; 
    break; 
    case "blah2": lEmoji = "639409067600773120"; 
    break; 
    case "blah3": lEmoji = "639409066921164810"; 
    break; 
    case "blah4": lEmoji = "639409066820763659"; 
    break; 
    case "blah5": lEmoji = "639409066917232650"; 
    break; 

    case "mint1": lEmoji = "639259799514775573"; 
    break; 
    case "mint2": lEmoji = "639259800328208428"; 
    break; 
    case "mint3": lEmoji = "639259802194804755"; 
    break; 
    case "mint4": lEmoji = "639259802014449705"; 
    break; 
    case "mint5": lEmoji = "639259799942594561"; 
    break; 

    case "row1": lEmoji = "639280717771309084"; 
    break; 
    case "row2": lEmoji = "639280718631010323"; 
    break; 
    case "row3": lEmoji = "639280719037857812"; 
    break; 
    case "row4": lEmoji = "639280719012691978"; 
    break; 
    case "row5": lEmoji = "639280719004172329"; 
    break; 

    case "hobi1": lEmoji = "639268453802442765"; 
    break; 
    case "hobi2": lEmoji = "639268454100369409"; 
    break; 
    case "hobi3": lEmoji = "639268454142181444"; 
    break; 
    case "hobi4": lEmoji = "639268453848449037"; 
    break; 
    case "hobi5": lEmoji = "639268454385451010"; 
    break; 

    case "mero1": lEmoji = "639293123574628352"; 
    break; 
    case "mero2": lEmoji = "639293123671097344"; 
    break; 
    case "mero3": lEmoji = "639293124161699850"; 
    break; 
    case "mero4": lEmoji = "639293124295786547"; 
    break; 
    case "mero5": lEmoji = "639293124128145409"; 
    break; 
}

message.channel.send(embed).then(sentEmbed => {
    sentEmbed.react(client.emojis.get(lEmoji)).then(sentEmbed => {
      messageID = sentEmbed.id; 
    })
    })
  }
});

// cache messages
client.on('raw', event => {
    const eventName = event.t; 
    if(eventName === 'MESSAGE_REACTION_ADD') {
      if(event.d.message_id === messageID) {
        var reactionChannel = client.channels.get(event.d.channel_id);
        if(reactionChannel.messages.has(event.d.message_id)) 
          return; 
        else {
          reactionChannel.fetchMessage(event.d.message_id)
          .then(msg => {
            var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id); 
            var user = client.users.get(event.d.user_id); 
            client.emit('messageReactionAdd', msgReaction, user); 
          })
          .catch(err => console.log(err))
          }
        }
    }
    else if (eventName == 'MESSAGE_REACTION_REMOVE') {
      if(event.d.message_id == messageID) {
        var reactionChannel = client.channels.get(event.d.channel_id);
        if(reactionChannel.messages.has(event.d.message_id)) 
          return; 
          else {
            reactionChannel.fetchMessage(event.d.message_id)
            .then(msg => {
              var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id); 
              var user = client.users.get(event.d.user_id); 
              client.emit('messageReactionRemove', msgReaction, user); 
            })
            .catch(err => console.log(err))
            }
        }
      }
    });
  
  // add role after adding reaction
  client.on("messageReactionAdd", (messageReaction, user) => { 
    var roleName = messageReaction.emoji.name; 
    roleName.toUpperCase();
    var role = messageReaction.message.guild.roles.find(role => role.name.toUpperCase() == roleName.toUpperCase());
    if (role) {
      var member = messageReaction.message.guild.members.find(member => member.id === user.id); 
      if(member) {
        member.addRole(role.id); 
      }
    }
  });
  
  // remove role after removing reaction
  client.on("messageReactionRemove", (messageReaction, user) => {
    var roleName = messageReaction.emoji.name; 
    roleName.toUpperCase();
    var role = messageReaction.message.guild.roles.find(role => role.name.toUpperCase() == roleName.toUpperCase());
    if (role) {
      var member = messageReaction.message.guild.members.find(member => member.id === user.id); 
      if(member) {
        member.removeRole(role.id); 
      }
    }
  });

client.login(process.env.BOT_TOKEN);