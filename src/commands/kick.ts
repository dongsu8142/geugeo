import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  name: "추방",
  category: "Moderation",
  description: "유저를 추방방합니다.",
  slash: "both",
  permissions: ["KICK_MEMBERS"],
  guildOnly: true,
  options: [
    {
      name: "유저",
      description: "추방방할 유저",
      required: true,
      type: 6,
    },
    {
      name: "이유",
      description: "추방방을 하는 이유를 적어주세요.",
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
        const reason = args.join(" ") || "이유 없음";
        await target.kick(reason);
        return `${target?.user.username}을 추방했습니다. 이유: ${reason}`;
      } else {
        return "대상이 지정되지 않았습니다.";
      }
    } catch (error) {
      return "권한이 부족합니다.";
    }
  },
} as ICommand;
