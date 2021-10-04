import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  name: "실행",
  category: "Moderation",
  description: "코드를 실행합니다.",
  slash: "both",
  ownerOnly: true,
  options: [
    {
      name: "코드",
      description: "실행할 코드를 작성해 주세요.",
      required: true,
      type: 3,
    },
  ],
  callback: ({ args, client }) => {
    const code = args.join(" ");
    if (code.indexOf("exit") != -1 && code.indexOf("process") != -1) {
      return "사용할 수 없습니다.";
    }
    const result = new Promise((resolve) => resolve(eval(code)));
    const embed = new MessageEmbed();
    const resultEmbed = result
      .then(async (output: any) => {
        if (typeof output !== "string")
          output = (await import("util")).inspect(output, {
            depth: 0,
          });

        if (output.includes(client.token))
          output = output.replaceAll(client.token, "토큰");
        if (output.length > 1010) output = output.slice(0, 1010) + "\n...";
        embed.setDescription(
          "입력 :\n```js\n" + code + "\n```\n출력 :```js\n" + output + "\n```"
        );
        embed.setColor("BLUE")
        return embed;
      })
      .catch((error) => {
        error = error.toString();
        if (error.includes(client.token))
          error = error.replaceAll(client.token, "토큰");
        embed.setTitle("오류!");
        embed.setDescription(`
          \`\`\`js
          ${error}
          \`\`\`
        `);
        embed.setColor("RED");
        return embed;
      });
    return resultEmbed;
  },
} as ICommand;
