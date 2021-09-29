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
      name: "사유",
      description: "추방방을 하는 사유를 적어주세요.",
      required: false,
      type: 3,
    },
  ],
  callback: async ({ guild, message, args, interaction }) => {
    try {
      const user = message
        ? message.mentions.users.first()
        : interaction.options.getUser("유저");
      args.shift();
      const reason =
        interaction.options.getString("사유") || args.join(" ") || "사유 없음";
      const target = (await guild?.members.fetch()!).get(user?.id!);
      if (target) {
        await target.kick(reason);
        return `${target?.user.username}을 벤했습니다. 사유: ${reason}`;
      } else {
        return "대상이 지정되지 않았습니다.";
      }
    } catch (error) {
      return "권한이 부족합니다.";
    }
  },
} as ICommand;
