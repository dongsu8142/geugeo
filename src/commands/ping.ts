import { ICommand } from "wokcommands";

export default {
  name: "핑",
  category: "Info",
  description: "딜레이를 보여줍니다.",
  slash: "both",
  callback: ({ message, interaction, client }) => {
    if (message) {
      message.channel.send("측정중").then((resultMessage) => {
        const ping: number =
          resultMessage.createdTimestamp - message.createdTimestamp;

        resultMessage.edit(`딜레이: ${ping}, API 딜레이: ${client.ws.ping}`);
      });
    }

    if (interaction) {
      interaction.reply(`API 딜레이: ${client.ws.ping}`);
    }
  },
} as ICommand;
