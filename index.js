const { Client, Collection } = require("discord.js");
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    intents: 32767,
});
const fs = require("fs");
client.commands = new Collection();
client.slashCommands = new Collection();

const config = require("./settings/config.json");
client.login(config.token);

/**************************** PARTIE HANDLER ****************************/

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name, command);
    };
});

fs.readdir('./events/', (err, files) => {
    files = files.filter(f => f.endsWith('.js'));
    files.forEach(f => {
        const event = require(`./events/${f}`);
        console.log(`Loading command ${f}`);
        client.on(f.split('.')[0], event.bind(null, client));
        delete require.cache[require.resolve(`./events/${f}`)];
    });
});

fs.readdirSync("./slashcommands").forEach(dirs => {
    const commands = fs.readdirSync(`./slashcommands/${dirs}/`).filter((files) => files.endsWith(".js"));
    for (const file of commands) {
        const command = require(`./slashcommands/${dirs}/${file}`);
        console.log(`Loading slashcommand ${file}`);
        client.slashCommands.set(command.name, command);
    }
});

/********** 
            *****************************
                                           PARTIE AFFICHAGE TWITCH PRIVEE
                                                                            ********************
                                                                                                  *************************/