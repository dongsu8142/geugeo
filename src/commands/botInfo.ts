import { MessageEmbed, version as djsversion } from "discord.js";
import { ICommand } from "wokcommands";
import os from "os";
import ms from "ms";

export default {
  name: "봇정보",
  category: "Info",
  description: "봇정보를 보여줍니다.",
  slash: "both",
  callback: ({ client }) => {
    const core = os.cpus()[0];
    const version = "1.0.0";
    const embed = new MessageEmbed()
      .setThumbnail(client.user?.displayAvatarURL()!)
      .setColor("BLUE")
      .addField(
        "일반",
        `**❯ 봇:** ${client.user?.tag} (${client.user?.id})` +
          `\n**❯ 업타임:** ${ms(client.uptime!, { long: true })}` +
          `\n**❯ 서버:** ${client.guilds.cache.size.toLocaleString()} ` +
          `\n**❯ 유저:** ${client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString()}` +
          `\n**❯ 채널:** ${client.channels.cache.size.toLocaleString()}` +
          `\n**❯ 만든날짜:** ${new Date(
            client.user?.createdTimestamp!
          ).toLocaleString()}` +
          `\n**❯ Node.js:** ${process.version}` +
          `\n**❯ 버전:** v${version}` +
          `\n**❯ Discord.js:** v${djsversion}` +
          "\n\u200b"
      )
      .addField(
        "시스템",
        `**❯ 플랫폼:** ${process.platform}` +
          `\n**❯ 업타임:** ${ms(os.uptime() * 1000, { long: true })}` +
          `\n**❯ CPU:**` +
          `\n\u3000 Cores: ${os.cpus().length}` +
          `\n\u3000 Model: ${core.model}` +
          `\n\u3000 Speed: ${core.speed}MHz` +
          `\n**❯ Memory:**` +
          `\n\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}` +
          `\n\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`
      )
      .setTimestamp();
    return embed;
  },
} as ICommand;

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}
