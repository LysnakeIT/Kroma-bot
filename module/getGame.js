const request = require('request')

async function getData(idGame, clientID,authkey) {
    return new Promise((resolve, reject) => {
        var headers = {
            'Client-Id': clientID,
            'Authorization': `Bearer ${authkey}`
        };
        request.get(
            `https://api.twitch.tv/helix/games?id=${idGame}`,{headers:headers},
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try{
                    resolve(JSON.parse(body))
                }catch(e){
                    reject(e)
                }
            }
        )
    });
}

module.exports = { getData };