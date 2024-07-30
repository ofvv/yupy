const discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
        name: "avatar",
        aliases: ["av"],
        usage: `avatar <@user>`,
        category: "Information",
    run: async (client, message, args) => {
      
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.member;

      let embed = new discord.MessageEmbed()
      .setColor(config.color)
      .setImage(member.user.displayAvatarURL({ dynamic: true, format: 'webp' }))
      .addField(`Links`, `**[PNG](${member.user.displayAvatarURL({ dynamic: true, format: 'png' })}) | [JPG](${member.user.displayAvatarURL({ dynamic: true, format: 'jpg' })})**`);

      message.channel.send(embed).catch(e => {

        let err = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(e);

        if (e.lenght > 2048) return;

        message.channel.send(e)
      })
  }
}