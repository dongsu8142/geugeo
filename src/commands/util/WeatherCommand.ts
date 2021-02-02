import { Message, MessageEmbed } from 'discord.js';
import request from 'request';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class WeatherCommand extends BaseCommand {
  constructor() {
    super('날씨', 'util', [], '현재날씨를 알려줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const area = encodeURI(args.join(' '));
    if (area) {
      request(
        `https://manyyapi.herokuapp.com/weather/${area}`,
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            const accountObj = JSON.parse(body);
            if (accountObj.success) {
              const embed = new MessageEmbed()
                .setTitle('날씨')
                .addField('지역', accountObj.지역, true)
                .addField('현재온도', accountObj.현재온도, true)
                .addField('체감온도', accountObj.체감온도, true)
                .addField('정보', accountObj.정보, true)
                .addField('자외선', accountObj.자외선, true)
                .addField('최저온도/최고온도', accountObj.최저최고온도, true)
                .addField('미세먼지', accountObj.미세먼지, true)
                .addField('초미세먼지', accountObj.초미세먼지, true)
                .addField('오존 지수', accountObj.오존지수, true);
              message.channel.send(embed);
            } else {
              message.channel.send(accountObj[0].error);
            }
          } else {
            message.channel.send('api 서버에서 오류가 발생했습니다.');
          }
        },
      );
    } else {
      message.channel.send('지역를 입력해주세요');
    }
  }
}
