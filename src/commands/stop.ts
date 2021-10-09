import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "중지",
  category: "Music",
  description: "음악을 중지하고 음성채널을 나갑니다.",
  slash: true,
  guildOnly: true,
  callback: ({ client, guild }) => {
    const player = (client as DiscordClient).player;
    const queue = player.getQueue(guild!);
    if (queue) {
      queue.stop();
      return "✅ | 음악을 중지했습니다";
    } else {
      return "❌ | 재생중인 노래가 없습니다!";
    }
  },
} as ICommand;
