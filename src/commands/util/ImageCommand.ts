import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { createApi } from "unsplash-js";
import config from "../../config.json";
import fetch from "node-fetch";

export default class ImageCommand extends BaseCommand {
  constructor() {
    super("이미지", "util", [], "이미지를 검색해서 보여줍니다.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const query = args.join(" ");
    const unsplash = createApi({
      accessKey: config["unsplash-accessKey"],
      fetch: fetch as any
    });
    unsplash.search
      .getPhotos({
        query,
        page: 1,
        perPage: 20,
      })
      .then(result => {
        if (result.errors) {
          message.channel.send("에러 발생");
        } else {
          if (result.response.total != 0) {
            const random = Math.floor(
              Math.random() * result.response.results.length
            );
            const photo = result.response.results[random].urls.raw;
            message.channel.send(photo);
          } else {
            message.channel.send("검색결과가 없습니다.");
          }
        }
      });
  }
}
