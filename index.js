import { strictEqual } from 'assert';
import DiscordJs, { Intents, Interaction, InteractionWebhook, Message } from 'discord.js'
import dotenv from 'dotenv'
// import handler from './command-handler.js'
import path from 'path';
import { fileURLToPath } from 'url';    

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
//Replies, flags, level and role
let replies=[ "Good Going","KEep it up","Success! Great work..."]
let flag_natas = [0,"abc{1_flag}","abc{2_flag}","abc{3_flag}","abc{4_flag}"]







function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
dotenv.config()  //gives access to .env file as environment variables
const client= new DiscordJs.Client({
    intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES]  //what info bot needs, what bot does
})


//slash commands
client.on('ready', ()=> {
    console.log('The bot is ready');
    const guildID ="867727130883653632"
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
        name:'submit',
        description:'give me flags and inreturn take your role',
        options:[
            {
                name:'game',
                description:'Name of your game',
                required:true,
                type:DiscordJs.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name:'level',
                description:'level of your game',
                required:true,
                type:DiscordJs.Constants.ApplicationCommandOptionTypes.NUMBER       
            },
            {
                name:'flag',
                description:'Flag',
                required:true,
                type:DiscordJs.Constants.ApplicationCommandOptionTypes.STRING  
            },

        ]


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
    if(commandName=='submit'){
        
        console.log("asds")
        const game=options.getString('game');
        const lvl =options.getNumber('level');
        const flag=options.getString('flag');

        let x,role_given;
        if(game.toLowerCase()=="natas")
        {

            if( flag_natas.indexOf(flag)  ==-1)
            { interaction.reply({
                content:'Wrong flag',
                ephemeral:true,//private message
            })}
           else{
              x=flag_natas.indexOf(flag);
           }
           role_given="natas"+ `${x+1}`;
           
        }
        let myRole = interaction.guild.roles.cache.find(role => role.name === role_given);

        if (interaction.member.roles.cache.some(r=>[`${role_given}`].includes(r.name)) ) {
            console.log("you already Have role");
            interaction.reply({
                     content:'You have already solved this challenge',
                     ephemeral:true,//private message
                })
           }
           
           else {
             let member=interaction.member;member.roles.add(myRole).catch(console.error);
             console.log("Yeah giving it wait")
             const rndInt = randomIntFromInterval(0, 2);
             interaction.reply({
                      content:replies[rndInt],
                      ephemeral:true,//private message
                 })
           }
          
    }

    if(commandName === 'add')
    {
        const  num1=options.getNumber('num1')
        const  num2=options.getNumber('num2')
        
        await interaction.deferReply({
            ephemeral:false
        })
        await new Promise(resolve=>setTimeout(resolve,5000))
        interaction.editReply({
            content:`The sum is ${num1+num2}`,
        })
    }

  
})

client.login(process.env.TOKEN);