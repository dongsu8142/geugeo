import { Track } from "discord-player";
import { Message, MessageEmbed, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "재생목록",
  category: "Music",
  description: "노래의 재생목록을 보여줍니다.",
  slash: true,
  guildOnly: true,
  testOnly: true,
  callback: async ({ client, guild, interaction, user }) => {
    const player = (client as DiscordClient).player;
    const queue = player.getQueue(guild!);
    if (queue) {
      const tracks = queue.tracks;
      let currentPage = 0;
      const embeds = generateQueueEmbed(tracks);
      const queueEmbed = (await interaction.reply({
        content: `현재 페이지: ${currentPage + 1}/${embeds.length}`,
        embeds: [embeds[currentPage]],
        fetchReply: true,
      })) as Message;
      await queueEmbed.react("⬅️");
      await queueEmbed.react("➡️");
      await queueEmbed.react("❌");

      const filter = (reaction: MessageReaction, reactionUser: User) => {
        return (
          ["⬅️", "➡️", "❌"].includes(reaction.emoji.name!) &&
          reactionUser.id === user.id
        );
      };
      const collector = queueEmbed.createReactionCollector({ filter });

      collector.on("collect", async (reaction: MessageReaction, user: User) => {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.reactions.resolve("➡️")?.users.remove(user.id);
            queueEmbed.edit({
              content: `현재 페이지: ${currentPage + 1}/${embeds.length}`,
              embeds: [embeds[currentPage]],
            });
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.reactions.resolve("⬅️")?.users.remove(user.id);
            queueEmbed.edit({
              content: `현재 페이지: ${currentPage + 1}/${embeds.length}`,
              embeds: [embeds[currentPage]],
            });
          }
        } else {
          collector.stop();
          queueEmbed.reactions.resolve("❌")?.users.remove(user.id);
        }
      });
    } else {
      return "❌ | 재생중인 노래가 없습니다!";
    }
  },
} as ICommand;

function generateQueueEmbed(queue: Track[]) {
  const embeds = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current
      .map((track) => `${++j}) [${track.title}](${track.url})`)
      .join("\n");
    const embed = new MessageEmbed().setDescription(
      `**[현재 음악: ${queue[0].title}](${queue[0].url})**\n${info}`
    );
    embeds.push(embed);
  }
  return embeds;
}
