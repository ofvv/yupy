module.exports = {
  name: 'invite',
  category: 'Information',
  description: "Invite Yupy",
  aliases: ['inv'],
  run: async (client, message, args) => {

    message.channel.send(`https://yupy.shop/invite`).catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))

  }
}