module.exports = {
	name: 'next',
	description: 'Перейти к следующей песне(в разработке)',
	execute(message) {
		const queue = message.client.queue
		if (!message.member.voice.channel) return message.channel.send('Вы должны находиться в канале чтобы пропустить трек!');
		if (queue.songs.length < 1) return message.channel.send('Нету песенок(')
    queue.connection.dispatcher.end()
	},
}
