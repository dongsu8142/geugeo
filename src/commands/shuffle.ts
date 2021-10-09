import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "셔플",
  category: "Music",
  description: "재생목록을 섞습니다.",
  slash: true,
  guildOnly: true,
  callback: ({ client, guild }) => {
    const player = (client as DiscordClient).player;
    const queue = player.getQueue(guild!);
    if (queue) {
      const success = queue.shuffle();
      return success
        ? "✅ | 재생목록을 섞었습니다.."
        : "❌ | 셔플에 실패했습니다.";
    } else {
      return "❌ | 재생중인 노래가 없습니다!";
    }
  },
} as ICommand;
