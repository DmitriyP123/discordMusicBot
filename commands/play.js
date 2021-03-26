const ytdl = require("ytdl-core")
const fetch = require('node-fetch')
module.exports = {
  name: "play",
  description: "Включить музыку",
  async execute(message,args) {
    await this.search(message,args)
    song = this.song
    try {
      const queue = message.client.queue
      const voiceChannel = message.member.voice.channel
      queue.voiceChannel = voiceChannel

      if (!voiceChannel)
        return message.channel.send(
          "Вы должны находиться в канале чтобы включить музыку"
        )

      if (queue.songs.length === 0) {
        queue.songs.push(song)
        try {
          let connect = await voiceChannel.join()
          queue.connection = connect
          this.play(message, queue.songs[0])
        } catch (err) {
          console.log(err)
          queue.songs = []
          return message.channel.send(err)
        }
      } else {
        queue.songs.push(song)
        return message.channel.send(
          `${song.title} была добавлена в очередь`
        )
      }
    } catch (error) {
      console.log(error)
      message.channel.send(error.message)
    }
  },

  play(message, song) {
    const queue = message.client.queue
    if (!song) {
      queue.voiceChannel.leave()
      queue.songs = []
      return
    }

    queue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        queue.songs.shift()
        this.play(message, queue.songs[0])
      })
      .on("error", error => console.error(error))
      message.channel.send(`Тусим: **${song.title}**`)
  },

  async search(message,args) {
    let song = {}
    let transcription =  {
      а: 'a', А: 'A',                  
      б: 'b', Б: 'B',
      в: 'v', В: 'V', 
      г: 'g', Г: 'G',
      д: 'd', Д: 'D',
      е: 'e', Е: 'E', 
      ё: 'yo',Ё: 'YO',
      ж: 'zh',Ж: 'ZH', 
      з: 'z', З: 'Z', 
      и: 'i', И: 'I', 
      й: 'j', Й: 'J',
      к: 'k', К: 'K',
      л: 'l', Л: 'L',
      м: 'm', М: 'M', 
      н: 'n', Н: 'N', 
      о: 'o', О: 'O', 
      п: 'p', П: 'P',
      р: 'r', Р: 'R',
      с: 's', С: 'S',
      т: 't', Т: 'T',
      у: 'u', У: 'U',
      ф: 'f', Ф: 'F',
      х: 'h', Х: 'H',
      ц: 'c', Ц: 'C',
      ч: 'ch',Ч: 'CH',
      ш: 'sh',Ш: 'SH',
      щ: `sh'`, Щ: `SH'`,
      ь: `'`,
      ы: `y'`,   Ы: `Y'`,
      ъ: `'' `, 
      э: `e' `, Э: `e' `,
      ю: 'yu', Ю: 'YU',
      я: 'ya', Я: 'YA',    
    }
  
    question = args.join('')
    for (let i of question) {
      if (transcription.hasOwnProperty(i)) {
        question = question.replace(i,transcription[i])
      }
    }
    
    question = question.toLowerCase()
		let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${process.env.YOUTOKEN}&type=video&part=snippet&maxResults=1&q=${question}`)
    let searchRes = await response.json()
    if (searchRes.items.length > 0) {searchRes.items.forEach((item) => {
    song.title = item.snippet.title
    song.url = `http://youtube.com/embed/${item.id.videoId}`
    this.song = song
    return message.channel.send('Нашлась')  
    })
    } else {
    return message.channel.send('Cложна найти')
    }		
	}
}
