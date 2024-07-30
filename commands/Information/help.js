const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');

module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help {command}",
  aliases: ["commands"],
  category: "Information",
  run: async (client, message, args, prefix) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

      if (!command) {
        return message.channel.send("Unknown Command: " + "`" + args[0] + "`");
      }

      let embed = new MessageEmbed()
        .setColor(config.color)
        if(command.name) embed.setTitle(`Name: ${command.name}`)
        if(command.description) embed.addField("Description", command.description, true)
        if(command.usage) embed.addField("Usage", "`" + prefix + command.usage + "`", true)
        if(command.aliases) embed.addField("Aliases", command.aliases.map(a => `**${a}**`).join(", "), true)

      return message.channel.send(embed).catch(e => {
        
        let err = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(e);

        if (e.lenght > 2048) return;

        message.channel.send(e)
      })
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setTitle(`Yupy's Command List`)
        .setColor(config.color)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category}`, desc);
      }

      let emd = new MessageEmbed()
      .setColor(config.color)
      .setAuthor(message.guild.name)
      .setDescription(`\n**Prefix in this server: \`${prefix}\`**\n\n**[Commands](https://yupy.shop/commands), [Website](https://yupy.shop/), [Invite](https://yupy.shop/invite), [Discord Server](https://yupy.shop/discord)**`)

      message.react('✅').catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))
      
      message.author.send(emx).catch(e => {
        
        message.react('❌')

      })
    }
  }
}