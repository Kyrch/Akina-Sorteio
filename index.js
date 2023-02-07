const Anilist = require("anilist-node");
const anilist = new Anilist();
const fs = require('fs');

let acceptLists = ['Watching', 'Rewatching', 'Completed ONA', 'Completed TV', 'Completed', 'Paused', 'Dropped'];
let usersAnilist = ['Kyrch', 'Cesar', 'MiltonXerox', 'Matinhos', 'Leglacezito', 'JOEZEIRA25', 'Kalezinho', 'Torne12', 'NoobAmbu', 'Irumis', 'Nexther'];
let matchs = [/2nd/i, /3rd/i, /[0-9]th/i, /season [0-9]/i, /second season/i, /third season/i, /final season/i, /part [0-9]/i]
let listUsersPerAnime = {};

main();

async function main() {
    await getLists();
    fs.writeFile("listUsersPerAnime.json", JSON.stringify(listUsersPerAnime), (err) => { })
}

async function getLists() {

    for (let userAnilist of usersAnilist) {
        let data = await anilist.lists.anime(userAnilist)
        let dataFiltersTypeList = data.filter(a => acceptLists.includes(a.name))

        for (let typeJson of dataFiltersTypeList) {

            typeJson.entries.forEach(entry => {
                let romaji = entry.media.title.romaji;
                for (let reg of matchs) {
                    if (romaji.match(reg)) return
                }

                listUsersPerAnime[romaji] = listUsersPerAnime[romaji] || { users: [], episodes: Number, duration: Number, yearDate: Number }
                listUsersPerAnime[romaji]["users"].push(userAnilist)
                listUsersPerAnime[romaji]["episodes"] = entry.media.episodes;
                listUsersPerAnime[romaji]["duration"] = entry.media.duration;
                listUsersPerAnime[romaji]["yearDate"] = entry.media.startDate.year;
            })
        }
    }
}