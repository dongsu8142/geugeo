import { Message, MessageEmbed, MessageReaction, ReactionCollector, ReactionEmoji, ReactionManager, User } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { Track } from "discord-player";

export default class QueueCommand extends BaseCommand {
  constructor() {
    super("재생목록", "music", [], "음악의 재생목록을 보여줍니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const player = await client.player;
    if (player.isPlaying(message)) {
      const queue: Track[] = await player.getQueue(message).tracks;
      let currentPage = 0;
      const embeds: MessageEmbed[] = generateQueueEmbed(queue);
      const queueEmbed: Message = await message.channel.send(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
      await queueEmbed.react('⬅️');
      await queueEmbed.react('➡️');
      await queueEmbed.react('❌');

      const filter = (reaction: MessageReaction, user: User) => {
        return ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
      }
      const collector = queueEmbed.createReactionCollector(filter);

      collector.on('collect', async (reaction: MessageReaction, user: User) => {
        if (reaction.emoji.name === '➡️') {
          if (currentPage < embeds.length-1) {
            currentPage++;
            queueEmbed.reactions.resolve('➡️')?.users.remove(message.author.id);
            queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
          } 
        } else if (reaction.emoji.name === '⬅️') {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.reactions.resolve('⬅️')?.users.remove(message.author.id);
            queueEmbed.edit(`Current Page ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          queueEmbed.reactions.resolve('❌')?.users.remove(message.author.id);
        }
      });
    }
  }
}

function generateQueueEmbed(queue: Track[]) {
    const embeds = [];
    let k = 10;
    for(let i = 0; i < queue.length; i += 10) {
      const current = queue.slice(i, k);
      let j = i;
      k += 10;
      const info = current.map(track => `${++j}) [${track.title}](${track.url})`).join('\n');
      const embed = new MessageEmbed()
        .setDescription(`**[Current Song: ${queue[0].title}](${queue[0].url})**\n${info}`);
      embeds.push(embed);
    }
    return embeds;
  }
