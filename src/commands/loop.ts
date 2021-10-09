import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "루프",
  category: "Music",
  description: "재생목록을 반복합니다.",
  slash: true,
  guildOnly: true,
  callback: ({ client, guild }) => {
    const player = (client as DiscordClient).player;
    const queue = player.getQueue(guild!);
    if (queue) {
      const repeat = queue.repeatMode;
      const success = queue.setRepeatMode(repeat !== 2 ? 2 : 0);
      return success
        ? repeat !== 2
          ? "✅ | 루프를 활성화 했습니다."
          : "✅ | 루프를 비활성화 했습니다."
        : "❌ | 스킵에 실패했습니다.";
    } else {
      return "❌ | 재생중인 노래가 없습니다!";
    }
  },
} as ICommand;
