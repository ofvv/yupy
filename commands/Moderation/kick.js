const discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
  name: "kick",
  category: "Moderation",
  description: "Kicking a Discord user from Discord Server!",
  usage: "kick @user <reason>",
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission('KICK_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) {
      
      let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | You need kick members permission to use this command`);
        
        return message.channel.send(embed);
      }

      if (!message.guild.me.hasPermission('KICK_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | I need kick members permission to kick a member`);
        
        return message.channel.send(embed);
      }

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]);

      if (!member) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | Please mention a user to kick!`);

        return message.channel.send(embed);
      }

      if (member.user.id === message.author.id) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | You can't kick yourself!`);
        
        return message.channel.send(embed);
      }

      if (!member.kickable) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | I can't kick this user`);

        return message.channel.send(embed);
      }

      let reason = args[1];
      if (!reason) reason = 'No reason';

      let embed = new discord.MessageEmbed()
      .setColor(config.color)
      .setAuthor(`Kicked ${member.user.tag}`, member.user.displayAvatarURL())
      .setDescription(`**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
      .setTimestamp()
      .setFooter(message.member.displayName, message.author.displayAvatarURL());

      message.channel.send(embed).catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))

      member.kick(`Mod: ${message.author.tag} | Reason: ${reason}`).catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))
  }
}