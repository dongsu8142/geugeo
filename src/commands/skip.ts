import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "스킵",
  category: "Music",
  description: "노래를 건너뜁니다.",
  slash: true,
  guildOnly: true,
  testOnly: true,
  callback: ({ client, guild }) => {
    const player = (client as DiscordClient).player;
    const queue = player.getQueue(guild!);
    if (queue) {
      const success = queue.skip();
      return success
        ? "✅ | 음악을 스킵했습니다."
        : "❌ | 스킵에 실패했습니다.";
    } else {
      return "❌ | 재생중인 음악이 없습니다!";
    }
  },
} as ICommand;
