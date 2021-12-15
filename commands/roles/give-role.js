import { Message } from 'discord.js';


module.exports={
    commands:'giverole',
    minArgs:3,
    expectedArgs:"<level> <flag> <role name>",
    callback:(message,arguments)=>{
        if(!targetUser){
            message.reply("User doen't get recognised")
            return;
        }

        arguments.shift()
        const rolename=arguments.join(' ')
        const {guild}= message
        const role=guild.roles.cache.find((role)=>{        return(role.name==rolename)})
        if(!role){
            message.reply(`Their is no role: ${rolename}`);
        }
        message.member.roles.add(role);
    }
   



}