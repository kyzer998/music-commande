const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");

module.exports = {
  name: "loop",
  description: "Bouclez votre file d'attente et amusez-vous",
  execute (client, message, args) {
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
      embed.setAuthor("Il n'y a rien à jouer que je pourrais boucler")
      return message.channel.send(embed);
    }
    
    //OOOOF
    serverQueue.loop = !serverQueue.loop
    
    
    embed.setDescription(`Loop est maintenant **${serverQueue.loop ? "Activer" : "Desactiver"}**`)
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
    
    
    
    
  }
}