const discord = require('discord.js');
const client = new discord.Client({ disableEveryone: true});
const config = require('./config.json');
const path = require('path');

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client)
})

client.on('ready', () => {
  console.log(client.user.tag);
  client.user.setActivity(`#help | Made by Proper`);
});

client.on('message', async message => {

  if (message.author.bot) return;
  if (!message.guild) return;

  let prefix = config.normal_prefix;

  if(!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {

    if (!message.guild.me.hasPermission(['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'])) {
      return message.channel.send(`❌ | I need add reactions, use external emojis, embed links & read message history permissions to work!`).catch(e => client.channels.cache.get(config.err_channel).send(`**Error in: ${message.guild.name} (${message.guild.id})**\n\n${e}`))
    }
    
    command.run(client, message, args, prefix);
    
  }
});

client.login(config.token); 