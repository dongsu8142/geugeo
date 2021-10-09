import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "반복",
  category: "Music",
  description: "노래 반복합니다.",
  slash: true,
  guildOnly: true,
  callback: ({ client, guild }) => {
    const player = (client as DiscordClient).player;
    const queue = player.getQueue(guild!);
    if (queue) {
      const repeat = queue.repeatMode;
      const success = queue.setRepeatMode(repeat !== 1 ? 1 : 0);
      return success
        ? repeat !== 1
          ? "✅ | 반복를 활성화 했습니다."
          : "✅ | 반복를 비활성화 했습니다."
        : "❌ | 스킵에 실패했습니다.";
    } else {
      return "❌ | 재생중인 노래가 없습니다!";
    }
  },
} as ICommand;
