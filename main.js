const dotenv = require('dotenv')
dotenv.config()
const Bot = require('./botClass/Bot')
const fs = require('fs')
const myBot = new Bot()
const pref = process.env.PREFIX
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

myBot.once('ready', () => {
	console.log('Ya ojil')
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	myBot.commands.set(command.name, command);
}

myBot.on('message', message => {
  if (!message.content.startsWith(pref)) return
  const args = message.content.slice(pref.length).trim().split(/\s+/)
  const commandName  = args.shift().toLowerCase()
  if (!myBot.commands.has(commandName)) return
  const command = myBot.commands.get(commandName)
  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error);
    message.reply('Ups oshibochka')
  }
});

myBot.login(process.env.TOKEN)
