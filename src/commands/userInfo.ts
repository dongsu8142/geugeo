import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import moment from "moment";

export default {
  name: "유저정보",
  category: "Info",
  description: "유저정보를 보여줍니다.",
  slash: "both",
  callback: ({ user, member }) => {
    const roles = member?.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    const embed = new MessageEmbed()
      .setTitle(`${member.displayName}님의 정보`)
      .setAuthor(user?.username, user?.displayAvatarURL())
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setDescription(
        `**이름**: ${user.username}\n**태그**: ${user.username}#${user.discriminator}\n**아이디**: ${user.id}`
      )
      .addField("유저", member.toString(), true)
      .addField("상태", member.presence?.status!, true)
      .addField(
        "게임",
        member.presence?.activities
          ? member.presence?.activities[0].name
          : "게임을하지 않음.",
        true
      )
      .addField("가장 높은 역할", member.roles.highest.toString(), true)
      .addField(
        "서버 참여 일",
        `\`${moment(member.joinedAt).format("MMM DD YYYY")}\``,
        true
      )
      .addField(
        "계정 생성 일",
        `\`${moment(user.createdAt).format("MMM DD YYYY")}\``,
        true
      )
      .addField("역할", `**[${roles?.length}]:** ${roles.join(", ")}`, true)
      .setFooter(member.displayName, user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("BLUE");
    return embed;
  },
} as ICommand;
