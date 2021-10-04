import { Client, Intents } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import YAML from "js-yaml";
import fs from "fs";
import { IConfig } from "./interface/config";

const config = YAML.load(fs.readFileSync("./config.yml", "utf8")) as IConfig;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});

client.on("ready", () => {
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    typeScript: true,
    testServers: config.bot.testServers,
  })
    .setDefaultPrefix(config.bot.prefix)
    .setBotOwner(config.bot.botOwners);
});

client.login(config.bot.token);
