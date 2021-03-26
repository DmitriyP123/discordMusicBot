const { Client, Collection } = require('discord.js')

module.exports = class Bot extends Client {
	constructor() {
    super()
		this.commands = new Collection()
		this.queue = {
      songs: new Array(),
    }
	}
}
