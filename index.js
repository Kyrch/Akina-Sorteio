const Anilist = require("anilist-node");
const anilist = new Anilist();
const fs = require('fs');

let acceptLists = ['Rewatching', 'Completed ONA', 'Completed TV', 'Completed', 'Paused', 'Dropped'];
let usersAnilist = ['Kyrch', 'Cesar', 'MiltonXerox'];
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
                listUsersPerAnime[romaji] = {};

                Array.isArray(listUsersPerAnime[romaji]["users"]) ? listUsersPerAnime[romaji]["users"].push(userAnilist) : listUsersPerAnime[romaji]["users"] = [userAnilist];
                listUsersPerAnime[romaji]["episodes"] = entry.media.episodes;
                listUsersPerAnime[romaji]["duration"] = entry.media.duration;
                listUsersPerAnime[romaji]["yearDate"] = entry.media.startDate.year;
            })
        }
    }
}