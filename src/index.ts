import { Intents } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import YAML from "js-yaml";
import fs from "fs";
import { IConfig } from "./interface/config";
import { Player } from "discord-player";
import DiscordClient from "./client";
import { Reverbnation } from "@discord-player/extractor";

const config = YAML.load(fs.readFileSync("./config.yml", "utf8")) as IConfig;

const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.player = new Player(client, {
  ytdlOptions: {
    filter: "audioonly",
  },
});
client.config = config;
client.player.use("reverbnation", Reverbnation);

client.player
  .on("trackStart", (queue: any, track) =>
    queue.metadata.channel.send(`🎶 | **${track.title}**를 시작합니다.`)
  )
  .on("trackAdd", (queue: any, track) => {
    if (queue.playing) {
      queue.metadata.channel.send(
        `🎶 | **${track.title}**를 재생목록에 추가합니다.`
      );
    }
  })
  .on("tracksAdd", (queue: any, tracks) =>
    queue.metadata.channel.send(
      `🎶 | **${tracks[0].playlist?.title}**를 재생목록에 추가합니다. (${tracks.length}개)`
    )
  )
  .on("queueEnd", (queue: any) =>
    queue.metadata.channel.send("✅ | 대기열 완료!")
  )
  .on("botDisconnect", (queue: any) =>
    queue.metadata.channel.send(
      "❌ | 음성 채널에서 수동으로 연결이 끊어졌습니다. 대기열을 지우는 중입니다!"
    )
  )
  .on("channelEmpty", (queue: any) =>
    queue.metadata.channel.send("❌ | 음성 채널에 아무도 없습니다.")
  )
  .on("error", (queue, error) =>
    console.log(
      `[${queue.guild.name}] 대기열에서 발생한 오류: ${error.message}`
    )
  )
  .on("connectionError", (queue, error) =>
    console.log(
      `[${queue.guild.name}] 연결에서 오류가 발생했습니다: ${error.message}`
    )
  );

client.on("ready", () => {
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    typeScript: true,
    testServers: config.bot.testServers,
    botOwners: config.bot.botOwners,
    mongoUri: config.database.uri,
  })
    .setCategorySettings([
      {
        name: "Info",
        emoji: "ℹ️",
      },
      {
        name: "Moderation",
        emoji: "🔨",
      },
      {
        name: "Music",
        emoji: "🎵",
      },
    ])
    .setDefaultPrefix(config.bot.prefix);
});

client.login(config.bot.token);
