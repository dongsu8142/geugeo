// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";

export default class GuildCreateEvent extends BaseEvent {
  constructor() {
    super("guildCreate");
  }

  async run(client: DiscordClient, guild: Guild) {
    global
      .update(client.guilds.cache.size)
      .then((r) => global.log(`봇이 ${guild.name}에 들어갔습니다.`));
  }
}
