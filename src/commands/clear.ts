import { ICommand } from "wokcommands";

export default {
  name: "청소",
  category: "Moderation",
  description: "메시지를 삭제합니다.",
  slash: "both",
  permissions: ["MANAGE_MESSAGES"],
  options: [
    {
      name: "개수",
      description: "메시지를 삭제할 개수",
      required: true,
      type: 4,
    },
  ],
  callback: async ({ args, channel }) => {
    try {
      const number = parseInt(args[0]);
      if (number) {
        if (parseInt(args[0]) > 0 || parseInt(args[0]) < 100) {
          await channel.bulkDelete(number + 1);
        } else {
          return "숫자는 1부터 99까지 가능합니다.";
        }
      } else {
        return "개수를 입력해 주세요";
      }
    } catch (error) {
      return "권한이 부족합니다.";
    }
  },
} as ICommand;
