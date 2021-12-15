import { Message } from 'discord.js';


module.exports={
    callback:( { message,...args }) =>{
        message.reply('Pong')
    },
}


