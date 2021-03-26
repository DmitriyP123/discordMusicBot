module.exports = {
	name: 'clear',
	description: 'Отчистка чата',
	async execute(message,args) {
		let deleteCount = 0;
		try {
      if (args[0]) {
        deleteCount = parseInt(args[0]) + 1
      } else {
        deleteCount = 99
      }
		}catch(err) {
			return message.reply('Введите число')
		}
        
		if (!deleteCount || deleteCount <= 1 || deleteCount > 100)
			return message.reply('Введите число от 1 до 99')

		const messagesToDelete = await message.channel.messages.fetch({
			limit: deleteCount,
		})
		message.channel.bulkDelete(messagesToDelete)
			.catch(error => message.reply(`Не могу удалить сообщения из-за: ${error}`))
	},
}
