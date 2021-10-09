import { ICommand } from "wokcommands";
import DiscordClient from "../client";

export default {
  name: "볼륨",
  category: "Music",
  description: "음량을 조정하거나 현재 음량을 보려줍니다.",
  slash: true,
  guildOnly: true,
  testOnly: true,
  options: [
      {
          name: "음량",
          description: "변경하고 싶은 음량",
          required: false,
          type: 4
      }
  ],
  callback: ({ client, guild, interaction }) => {
    const player = (client as DiscordClient).player;
    const queue = player.getQueue(guild!);
    if (queue) {
      const vol = interaction.options.getInteger("음량")
      if (vol) {
      const success = queue.setVolume(vol);
      return success
        ? `✅ | 음량을 ${vol}으로 변경했습니다.`
        : "❌ | 음량 변경에 실패했습니다.";
      } else {
          return `✅ | 현재 음량: ${queue.volume}`
      }
    } else {
      return "❌ | 재생중인 음악이 없습니다!";
    }
  },
} as ICommand;
