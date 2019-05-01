require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const database = require('./database')

const { DISCORD_BOT_TOKEN } = process.env

client.once('ready', () => {
    console.log('Ready!');
});

// function to call checkRoles on /discord-collect command
client.on('message', message => {
    if (message.content.startsWith('/')) {
        const firstArg = message.content.split(' ')[0]
        const command = firstArg.substring(1, firstArg.length)
    
        switch (command) {
          case 'discord-collect':
            return checkRoles(message)
          default:
            break
        }
      }
});

// functions to collect user information from specific role
function checkRoles(message) {
    const allRoles = message.guild.roles.array();
    selectRole(allRoles, allRoles, "{ roleName }", "{ /firebaseAddress }");
    console.log('Done!')
}

function selectRole(roles, allRoles, name, dbName) {
    var a = -1;
    for (var i = 0; i < roles.length; i++){
        if (roles[i].name === name){
            console.log(roles[i].name)
            a = i;
        }
    }
    const roleMembers = allRoles[a].members.array();
    users(roleMembers, dbName);
}

function users (roleMembers, dbName) {
    for (var i = 0; i < roleMembers.length; i++){
        const selected = roleMembers[i].user;
        const user = {
            id: selected.id,
            username: selected.username,
            avatar: selected.avatar
        }

        database.ref(`${dbName}` + '/' + user.id).set({
            id: user.id,
            name: user.username,
            picture: user.avatar
        });
    }
    return
}

client.login(DISCORD_BOT_TOKEN);