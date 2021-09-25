import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "(╯°□°）╯︵ ┻━┻",
  VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
};

export default {
  name: "서버정보",
  category: "Info",
  description: "서버정보를 보여줍니다.",
  guildOnly: true,
  slash: "both",
  callback: async ({ guild }) => {
    const roles = (await guild?.roles.fetch())
      ?.sort((a, b) => b.position - a.position)
      .filter((role) => role.id !== guild?.id)
      .map((role) => role.toString());
    const members = await guild?.members.fetch();
    const channels = await guild?.channels.fetch();
    const emojis = await guild?.emojis.fetch();
    const owner = await guild?.fetchOwner();
    const embed = new MessageEmbed()
      .setDescription(`${guild?.name}의 정보`)
      .setThumbnail(guild?.iconURL({ dynamic: true })!)
      .setColor("BLUE")
      .addField(
        "일반",
        `**❯ 이름:** ${guild?.name}` +
          `\n**❯ 아이디:** ${guild?.id}` +
          `\n**❯ 설명:** ${guild?.description || "None"}` +
          `\n**❯ 소유자:** ${owner?.user.tag}` +
          `\n**❯ 부스트 티어:** ${
            guild?.premiumTier ? `${guild?.premiumTier}티어` : `없습니다.`
          }` +
          `\n**❯ 보안 레벨:** ${
            verificationLevels[guild?.verificationLevel!]
          }` +
          `\n**❯ 생성일:** ${new Date(
            guild?.createdTimestamp!
          ).toLocaleString()}` +
          "\n\u200b"
      )
      .addField(
        "통계",
        `**❯ 역할:** ${roles?.length}` +
          `\n**❯ 이모지:** ${emojis?.size}` +
          `\n**❯ 일반 이모지:** ${
            emojis?.filter((emoji) => !emoji.animated).size
          }` +
          `\n**❯ 애니메이션 이모지:** ${
            emojis?.filter((emoji) => emoji.animated!).size
          }` +
          `\n**❯ 인원:** ${guild?.memberCount}` +
          `\n**❯ 사람:** ${
            members?.filter((member) => !member.user.bot).size
          }` +
          `\n**❯ 봇:** ${members?.filter((member) => member.user.bot).size}` +
          `\n**❯ 텍스트 채널:** ${
            channels?.filter((channel) => channel.type === "GUILD_TEXT").size
          }` +
          `\n**❯ 음성 채널:** ${
            channels?.filter((channel) => channel.type === "GUILD_VOICE").size
          }` +
          `\n**❯ 부스트:** ${guild?.premiumSubscriptionCount || "0"}` +
          "\n\u200b"
      )
      .addField(
        "상태",
        `**❯ 온라인:** ${
          members?.filter((member) => member.presence?.status === "online").size
        }` +
          `\n**❯ 자리 비움:** ${
            members?.filter((member) => member.presence?.status === "idle").size
          }` +
          `\n**❯ 다른 용무 중:** ${
            members?.filter((member) => member.presence?.status === "dnd").size
          }` +
          `\n**❯ 오프라인:** ${
            members?.filter(
              (member) =>
                member.presence?.status === "offline" ||
                member.presence?.status === undefined
            ).size
          }` +
          "\n\u200b"
      )
      .addField(`Roles [${roles?.length!}]`, roles?.join(", ")!);

    return embed;
  },
} as ICommand;
