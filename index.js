import DiscordJs, { Intents, Interaction, InteractionWebhook } from 'discord.js'
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
    //guild 
    //global
    const guildID ="***************************"
    const guild= client.guilds.cache.get(guildID)
    let commands   //handles commands for a guild
    if(guild)
    {
        commands=guild.commands
    }
    else{
        commands=client.application?.commands
    }
    commands?.create({
        name:'ping',
        description:'Replies with pong'
    })

    commands?.create({
        name:'add',
        description:'adds two numbers',
        options:[
        {
            name:'num1',
            description:'The first number',
            required:true,
            type:DiscordJs.Constants.ApplicationCommandOptionTypes.NUMBER //we could use '3' also        
        },
        {
            name:'num2',
            description:'The Second number',
            required:true,
            type:DiscordJs.Constants.ApplicationCommandOptionTypes.NUMBER //we could use '3' also        
        }
        ]
    });

})
client.on('interactionCreate', async (interaction)=>{
    if( !interaction.isCommand()){return;}
    const {commandName,options}=interaction
    if(commandName=='ping'){
        interaction.reply({
            content:'pong',
            ephemeral:true,//private message
        })
    }

    if(commandName === 'add')
    {
        const  num1=options.getNumber('num1')
        const  num2=options.getNumber('num2')
        interaction.reply({
            content:`The sum is ${num1+num2}`,
            ephemeral:true,
        })
    }
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
