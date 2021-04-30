import { Player, Queue, Track } from 'discord-player';
import { Message, MessageCollector, MessageEmbed, Intents } from 'discord.js';
import { registerCommands, registerEvents } from './utils/registry';
import config from './config.json';
import DiscordClient from './client/client';
import './utils/misc';

const client: DiscordClient = new DiscordClient({
  ws: { intents: new Intents(Intents.ALL) },
});
const player: Player = new Player(client);

(async () => {
  client.player = player;
  client.prefix = config.prefix || client.prefix;
  client.player
    .on('trackStart', (message: Message, track: Track) =>
      message.channel.send(`${track.title}를 시작합니다.`),
    )
    .on('trackAdd', (message: Message, queue: Queue, track: Track) =>
      message.channel.send(`${track.title}이 대기열에 추가되었습니다!`),
    )
    .on('playlistAdd', (message: Message, queue: Queue, playlist) =>
      message.channel.send(
        `${playlist.title}이 대기열에 추가되었습니다. (${playlist.videoCount}개)!`,
      ),
    )
    .on('searchResults', (message: Message, query: string, tracks: Track[]) => {
      const embed: MessageEmbed = new MessageEmbed()
        .setAuthor(`${query}에 대한 검색 결과입니다.`)
        .setDescription(tracks.map((t, i) => `${i + 1}. ${t.title}`))
        .setFooter('플레이하고 싶은 곡 번호를 보내주세요!');
      message.channel.send(embed);
    })
    .on(
      'searchInvalidResponse',
      (
        message: Message,
        query: string,
        tracks: Track[],
        content: string,
        collector: MessageCollector,
      ) => {
        if (content === '취소') {
          collector.stop();
          return message.channel.send('검색이 취소되었습니다!');
        }

        message.channel.send(
          `${tracks.length}과 1에서 사이의 유효한 번호를 보내야합니다.`,
        );
      },
    )
    .on('searchCancel', (message: Message, query: string, tracks: Track[]) =>
      message.channel.send(
        '유효한 응답을 제공하지 않았습니다 ... 명령을 다시 보내십시오!',
      ),
    )
    .on('noResults', (message: Message, query: string) =>
      message.channel.send(`${query}를 YouTube에서 검색된 결과가 없습니다`),
    )
    .on('queueEnd', (message: Message, queue: Queue) =>
      message.channel.send(
        '대기열에 더 이상 음악이 없어 음악이 중지되었습니다!',
      ),
    )
    .on('channelEmpty', (message: Message, queue: Queue) => {
      message.channel.send(
        '음성 채널에 더 이상 멤버가 없어 음악이 중단되었습니다!',
      );
    })
    .on('botDisconnect', (message: Message) =>
      message.channel.send('채널 연결이 끊어져서 음악이 멈췄어요!'),
    )
    .on('error', (error: string, message: Message) => {
      switch (error) {
        case 'NotPlaying':
          message.channel.send('재생중인 음악이 없습니다!');
          break;
        case 'NotConnected':
          message.channel.send('음성 채널에 연결되어 있지 않습니다!');
          break;
        case 'UnableToJoin':
          message.channel.send(
            '음성 채널에 참여할 수 없습니다. 내 권한을 확인하세요!',
          );
          break;
        case 'LiveVideo':
          message.channel.send('YouTube 라이브는 지원되지 않습니다!');
          break;
        default:
          message.channel.send(`문제가 발생했습니다 ... Error: ${error}`);
      }
    });
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();
