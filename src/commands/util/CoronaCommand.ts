import { Message, MessageEmbed } from 'discord.js';
import request from 'request';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class CoronaCommand extends BaseCommand {
  constructor() {
    super('코로나', 'util', [], '코로나 현재상황을 알려줍니다.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    request(
      `https://manyyapi.herokuapp.com/corona`,
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const accountObj = JSON.parse(body);
          const embed = new MessageEmbed()
            .setTitle('Covid-19 Virus Korea Status')
            .addField(
              'Data source : Ministry of Health and Welfare of Korea',
              'http://ncov.mohw.go.kr/index.jsp',
              false,
            )
            .addField(
              'Latest data refred time',
              `해당 자료는 ${accountObj.time} 자료입니다.`,
              false,
            )
            .addField('확진환자(누적)', accountObj.확진환자, true)
            .addField('완치환자(격리해제)', accountObj.완치환자, true)
            .addField('치료중(격리 중)', accountObj.치료중, true)
            .addField('사망', accountObj.사망, true)
            .addField('누적확진률', accountObj.누적확진률, true)
            .addField('치사율', accountObj.치사율, true);
          message.channel.send(embed);
        }
      },
    );
  }
}
