import { Message, MessageEmbed } from 'discord.js';
import request from 'request';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class PokemonCommand extends BaseCommand {
  constructor() {
    super('포켓몬', 'util', [], '포켓몬의 초기 스탯을 알려줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const name = encodeURI(args.join(' '));
    if (name) {
      request(
        `https://koreaapi.herokuapp.com/pokemon/${name}`,
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            const accountObj = JSON.parse(body);
            const embed = new MessageEmbed()
              .setTitle('포켓몬')
              .setImage(accountObj.url)
              .addField('이름', accountObj.이름, true)
              .addField('채력', accountObj.채력, true)
              .addField('공격력', accountObj.공격력, true)
              .addField('방어력', accountObj.방어력, true)
              .addField('특수 공격', accountObj['특수 공격'], true)
              .addField('특수 방어', accountObj['특수 방어'], true)
              .addField('스피드', accountObj.스피드, true)
              .addField('타입', accountObj.타입, true);
            message.channel.send(embed);
          }
        },
      );
    } else {
      message.channel.send('이름 또는 아이디를 입력해주세요');
    }
  }
}
