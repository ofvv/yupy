const discord = require('discord.js');

module.exports = {
  name: 'unban',
  category: 'Mod',
  description: 'Unban Command',
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission('BAN_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) {
      
      let embed = new discord.MessageEmbed()
        .setColor("#000000")
        .setDescription(`You Don't Have Perms To Use This Command!`);
        
        return message.channel.send(embed);
      }
      
      if (!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        let embed = new discord.MessageEmbed()
        .setColor("#000000")
        .setDescription(`I Don't Have Enough Perms!`);
        
        return message.channel.send(embed);
      }
    message.guild.fetchBans().then(bans=> {

      if(bans.size == 0) {
        let embed = new discord.MessageEmbed()
        .setColor("#000000")
        .setDescription(`This Server Doesn't Have Any Banned Members!`);

        return message.channel.send(embed);
      }

      let bUser = bans.find(member => member.user.id === message.content.slice(7)) || bans.find(member => member.user.tag === message.content.slice(7));

      if(!bUser) {
        let embed = new discord.MessageEmbed()
        .setColor("#000000")
        .setDescription(`This Person Hasn't Been Banned!`);

        return message.channel.send(embed);
      }

      let embed = new discord.MessageEmbed()
      .setColor(config.color)
      .setAuthor(`Unbanned ${bUser.user.tag}`, bUser.user.displayAvatarURL())
      .setDescription(`**Mod:** ${message.author.tag}`)
      .setTimestamp()
      .setFooter(message.member.displayName, message.author.displayAvatarURL());      
      })

  }
}