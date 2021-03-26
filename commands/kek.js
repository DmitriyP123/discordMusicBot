const fetch = require('node-fetch')
module.exports = {
	name: 'kek',
  description: 'KEKW',
	async execute(message, args) {
   let response = await fetch('https://meme-api.herokuapp.com/gimme/1')
   let meme = await response.json()
    message.channel.send(meme.memes[0].url)
		message.channel.send('KEKW')
	},
}
