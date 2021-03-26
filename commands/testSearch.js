const fetch = require('node-fetch')
module.exports = {
	name: 'test',
	description: 'Тестовый поиск',
	async execute(message,args) {
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
		fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${process.env.YOUTOKEN}&type=video&part=snippet&maxResults=1&q=${question}`)
        .then(res => res.json())
        .then(searchRes => {if (searchRes.items.length > 0) {searchRes.items.forEach((item) => {
            // console.log(item)
            return message.channel.send('нашел')       
        })
      } else {
        return message.channel.send('сложна найти')
      }
      })		
	},
}
