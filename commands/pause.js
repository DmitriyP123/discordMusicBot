module.exports = {
	name: 'pause',
	description: 'Пауза',
	execute(message) {
		const queue = message.client.queue
		if (!message.member.voice.channel) return message.channel.send('Вы должны находиться в канале чтобы поставить музыку на паузу!');
		if (queue.songs.length < 1) return message.channel.send('Нечего паузить')
    queue.connection.dispatcher.pause()
    message.channel.send(`**Пауза**`)
	},
};
