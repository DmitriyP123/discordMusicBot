module.exports = {
	name: 'stop',
	description: 'Останавливает все песни',
	execute(message) {
		const queue = message.client.queue
		if (!message.member.voice.channel) return message.channel.send('Вы должны находиться в канале чтобы выключить музыку!');
		if (queue.songs.length < 1) return message.channel.send('Нечего останавливать, не газуй')
    queue.songs = [];
		queue.connection.dispatcher.end();
    message.channel.send(`**Очередь очищена**`)
	},
};
