import DiscordJs, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()  //gives access to .env file as environment variables
const client= new DiscordJs.Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]  //what info bot needs, what bot does

})

client.on('ready', ()=> {
    console.log('The bot is ready');
})
client.on('messageCreate', (message)=>{
    if(message.content === 'ping')
    {
        message.reply({
            content:'pong',
        })
    }
})
client.login(process.env.TOKEN)