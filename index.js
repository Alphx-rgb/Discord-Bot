import DiscordJs, { Intents, Interaction, InteractionWebhook, Message } from 'discord.js'
import dotenv from 'dotenv'
// import handler from './command-handler.js'
import path from 'path';
import { fileURLToPath } from 'url';    

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 



dotenv.config()  //gives access to .env file as environment variables
const client= new DiscordJs.Client({
    intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES]  //what info bot needs, what bot does
})

client.on('ready', ()=> {
    handler=require('./command-handler')  //error
    if(handler.default){ //default object
        handler=handler.object 
    }
    handler(client)
})
client.login(process.env.TOKEN)
