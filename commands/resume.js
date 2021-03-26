module.exports = {
	name: 'resume',
	description: 'Продолжить',
	execute(message) {
		const queue = message.client.queue
		if (!message.member.voice.channel) return message.channel.send('Вы должны находиться в канале чтобы поставить музыку на паузу!');
		if (queue.songs.length < 1) return message.channel.send('Нечего резюмить')
    queue.connection.dispatcher.resume()
    message.channel.send(`**Тусим дальше**`)
	},
};
