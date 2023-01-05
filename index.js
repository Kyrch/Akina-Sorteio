const Anilist = require("anilist-node");
const anilist = new Anilist();
const fs = require('fs');

let acceptLists = ['Rewatching', 'Completed ONA', 'Completed TV', 'Completed', 'Paused', 'Dropped'];
let usersAnilist = ['Kyrch', 'Cesar', 'MiltonXerox'];
let listAnimesPerUser = {};
let listUsersPerAnime = {};

main();

async function main() {
    await getLists();
    fs.writeFile("listUsersPerAnime.json", JSON.stringify(listUsersPerAnime), (err) => {})
}

async function getLists() {

    for (let userAnilist of usersAnilist) {
        let data = await anilist.lists.anime(userAnilist)
        let dataFiltersTypeList = data.filter(a => acceptLists.includes(a.name))

        listAnimesPerUser[userAnilist] = []
        for (let typeJson of dataFiltersTypeList) {
            entries = typeJson.entries.filter(a => a.media.episodes >= 10 && a.media.episodes <= 26 && a.media.duration >= 15);

            entries.forEach(entry => {
                let romaji = entry.media.title.romaji;
                Array.isArray(listUsersPerAnime[romaji]) ? listUsersPerAnime[romaji].push(userAnilist) : listUsersPerAnime[romaji] = [userAnilist];
            })
        }
    }
}