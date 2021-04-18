const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");



const discord = require("discord.js");

module.exports = {
  name: "stop",
  description: "Arrêtez la musique et reposez-vous ;)",
  execute(client, message, args) {
    
    
let embed = new MessageEmbed()
.setColor(COLOR);

    const { channel } = message.member.voice;
      
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("VOUS DEVEZ ÊTRE DANS LE CANAL VOCAL :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Il n'y a rien de jouer que je pourrais arrêter")
      return message.channel.send(embed);
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
};
