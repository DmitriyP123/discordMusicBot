const fetch = require('node-fetch')
const fs = require('fs')
module.exports = {
	name: 'cat',
  description: 'Получить фоточку котика',
	async execute(message, args) {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json())
    message.channel.send(file)
		message.channel.send('krasivii kotik')
	},
}

