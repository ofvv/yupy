const discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
  name: "ban",
  category: "Moderation",
  description: "Bannig a Discord user from Discord Server!",
  usage: "ban @user {reason}",
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission('BAN_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) {
      
      let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | You need ban members permission to use this command`);
        
        return message.channel.send(embed);
      }

      if (!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | I need ban members permission to ban a member`);
        
        return message.channel.send(embed);
      }

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]);

      if (!member) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | Please mention a user to ban!`);

        return message.channel.send(embed);
      }

      if (member.user.id === message.author.id) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | You can't ban yourself!`);
        
        return message.channel.send(embed);
      }

      if (!member.bannable) {
        let embed = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(`❌ | I can't ban this user`);

        return message.channel.send(embed);
      }

      let reason = args[1];
      if (!reason) reason = 'No reason';

      let embed = new discord.MessageEmbed()
      .setColor(config.color)
      .setAuthor(`Banned ${member.user.tag}`, member.user.displayAvatarURL())
      .setDescription(`**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
      .setTimestamp()
      .setFooter(message.member.displayName, message.author.displayAvatarURL());

      message.channel.send(embed).catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))

      member.ban({ days: 7, reason: `Mod: ${message.author.tag} | Reason: ${reason}` }).catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))
  }
}