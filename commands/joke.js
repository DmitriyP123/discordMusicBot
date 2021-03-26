const fetch = require('node-fetch')
module.exports = {
	name: 'joke',
  description: 'Шутейка',
	async execute(message, args) {
    const {value} = await fetch('http://api.icndb.com/jokes/random').then(response => response.json())
	  message.channel.send(value.joke)
	},
}



