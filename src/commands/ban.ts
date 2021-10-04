import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  name: "벤",
  category: "Moderation",
  description: "유저를 벤합니다.",
  slash: "both",
  permissions: ["BAN_MEMBERS"],
  guildOnly: true,
  options: [
    {
      name: "유저",
      description: "벤할 유저",
      required: true,
      type: 6,
    },
    {
      name: "이유",
      description: "벤을 하는 이유를 적어주세요.",
      required: false,
      type: 3,
    },
  ],
  callback: async ({ message, args, interaction }) => {
    try {
      const target = message
        ? message.mentions.members?.first()
        : (interaction.options.getMember("유저") as GuildMember);
      if (target) {
        args.shift();
        const reason = args.join(" ") || "사유 없음";
        await target.ban({ reason });
        return `${target?.user.username}을 벤했습니다. 이유: ${reason}`;
      } else {
        return "대상이 지정되지 않았습니다.";
      }
    } catch (error) {
      return "권한이 부족합니다.";
    }
  },
} as ICommand;
