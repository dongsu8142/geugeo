import { ICommand } from "wokcommands";
import DiscordClient from "../client";
import { Lyrics } from "@discord-player/extractor";

export default {
  name: "가사",
  category: "Music",
  description: "노래의 가사를 보여줍니다.",
  aliases: ["자막"],
  slash: true,
  guildOnly: true,
  options: [
    {
      name: "노래",
      description: "노래의 가사를 보여줍니다.",
      required: false,
      type: 3,
    },
  ],
  callback: async ({ client, guild, interaction }) => {
    const config = (client as DiscordClient).config;
    const player = (client as DiscordClient).player;
    const lyricsClient = Lyrics.init(config?.apiKey.genius);
    const queue = player.getQueue(guild!);
    const music = interaction.options.getString("노래");
    if (queue) {
      if (!music) {
        const lyrics = await lyricsClient.search(queue.tracks[0].title);
        return lyrics ? lyrics.lyrics : "❌ | 자막을 찾을 수 없습니다.";
      } else {
        const lyrics = await lyricsClient.search(music);
        return lyrics ? lyrics.lyrics : "❌ | 자막을 찾을 수 없습니다.";
      }
    } else {
      if (music) {
        const lyrics = await lyricsClient.search(music);
        return lyrics ? lyrics.lyrics : "❌ | 자막을 찾을 수 없습니다.";
      } else {
        return "❌ | 재생중인 노래가 없습니다 노래 재목을 입력해 주세요";
      }
    }
  },
} as ICommand;
