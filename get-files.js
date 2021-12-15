const fs = require('fs')

const getFiles= (string,string)=>{
    const files= fs.readdirSync(dir , {
        withFileTypes:true, //validate that the result is a file or folder
    })

    let commandFiles =[]
    for( const file of files){
        if(files.isDirectory()){ //it moves recursively and gives file with suffix (.js)
            commandFiles=[
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`,suffix)
            ]
        }else if( file.name.endsWith(suffix)){
            commandFiles.push(`${dir}/${file.name}`)
        }
    }
    return commandFiles
    
}


module.exports =getFiles