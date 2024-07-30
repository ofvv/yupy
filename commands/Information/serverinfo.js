const discord = require('discord.js');
const moment = require('moment');
const config = require('../../config.json');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = {
  name: "serverinfo",
  description:
    "Get Information for discord server",
  aliases: ["server"],
  category: "Information",
  run: async (client, message, args, prefix) => {

    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new discord.MessageEmbed()
			.setAuthor(`Serverinfo for: ${message.guild.name}`)
			.setColor(config.color)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Server', [
				`**🡺 Name:** ${message.guild.name}`,
				`**🡺 ID:** ${message.guild.id}`,
				`**🡺 Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**🡺 Region:** ${regions[message.guild.region]}`,
				`**🡺 Boost Level:** ${message.guild.premiumTier ? `${message.guild.premiumTier}` : '0'}`,
				`**🡺 Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**🡺 Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**🡺 Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`,
				'\u200b'
			])
			.addField('Statistics', [
				`**🡺 Roles:** ${roles.length}`,
				`**🡺 Emojis:** ${emojis.size}`,
				`**🡺 Normal Emojis:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**🡺 Animated Emojis:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**🡺 Users:** ${message.guild.memberCount}`,
				`**🡺 Humans:** ${members.filter(member => !member.user.bot).size}`,
				`**🡺 Bots:** ${members.filter(member => member.user.bot).size}`,
				`**🡺 Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**🡺 Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**🡺 Boosts:** ${message.guild.premiumSubscriptionCount || '0'}`
			])
			.setFooter(client.user.username, client.user.avatarURL());
      
		message.channel.send(embed).catch(e => {
        
        let err = new discord.MessageEmbed()
        .setColor(config.err_color)
        .setDescription(e);

        if (e.lenght > 2048) return;
        
        message.channel.send(e)
      })
  }
}