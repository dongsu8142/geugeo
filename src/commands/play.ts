import { QueryType } from "discord-player";
import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "플레이",
  category: "Music",
  description: "노래를 재생합니다.",
  slash: true,
  guildOnly: true,
  options: [
    {
      name: "query",
      type: 3,
      description: "듣고 싶은 노래",
      required: true,
    },
  ],
  callback: async ({ interaction, member, client, guild, channel, user }) => {
    const player = (client as DiscordClient).player;
    if (!member.voice.channelId) {
      return {
        custom: true,
        content: "❌ | 음성 채널에 있지 않습니다",
        ephemeral: true,
      };
    }
    if (
      guild?.me?.voice.channelId &&
      member.voice.channelId !== guild.me.voice.channelId
    )
      return {
        custom: true,
        content: "❌ | 같은 음성 채널에 있지 않습니다",
        ephemeral: true,
      };
    const query = interaction.options.getString("query")!;
    const queue = player.createQueue(guild!, {
      metadata: {
        channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(member.voice.channel!);
    } catch {
      queue.destroy();
      return {
        custom: true,
        content: "❌ | 음성 채널에 참여할 수 없습니다",
        ephemeral: true,
      };
    }

    await interaction.deferReply();
    const searchResult = await player.search(query, {
      requestedBy: user,
      searchEngine: QueryType.AUTO,
    });

    if (!searchResult || !searchResult.tracks.length) {
      await interaction.followUp({
        content: `❌ | **${query}**를 찾을 수 없습니다.`,
      });
      return;
    }
    if (searchResult.playlist) {
      queue.addTracks(searchResult.tracks);
    } else {
      queue.addTrack(searchResult.tracks[0]);
    }

    if (!queue.playing) {
      await queue.play();
      await interaction.followUp({
        content: `⏱️ | **${searchResult.tracks[0].title}**을 로딩하고 있습니다.`,
      });
    }
  },
} as ICommand;
