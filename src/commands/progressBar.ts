import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "재생시간",
  category: "Music",
  description: "재생바를 보여줍니다.",
  slash: true,
  guildOnly: true,
  testOnly: true,
  callback: ({ client, guild }) => {
    const player = (client as DiscordClient).player;
    const queue = player.getQueue(guild!);
    if (queue) {
      const progressBar = queue.createProgressBar({ timecodes: true });
      return `✅ | ${progressBar}`;
    } else {
      return "❌ | 재생중인 노래가 없습니다!";
    }
  },
} as ICommand;
