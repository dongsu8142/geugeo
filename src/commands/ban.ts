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
      name: "사유",
      description: "벤을 하는 사유를 적어주세요.",
      required: false,
      type: 3,
    },
  ],
  callback: async ({ guild, message, client, args }) => {
    try {
      const user = message
        ? message.mentions.users.first()
        : await client.users.fetch(args[0]);
      args.splice(0, 1);
      const reason = args.join(" ") || "사유 없음";
      const target = (await guild?.members.fetch()!).get(user?.id!);
      if (target) {
        await target.ban({ reason });
        return `${target?.user.username}을 벤했습니다. 사유: ${reason}`;
      } else {
        return "대상이 지정되지 않았습니다.";
      }
    } catch (error) {
      return "권한이 부족합니다.";
    }
  },
} as ICommand;
