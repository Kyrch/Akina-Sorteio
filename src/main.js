listUsersPerAnime = k

let usersGame = ['Kyrch', 'Cesar', 'MiltonXerox'];

function clickButton() {
    minEps = parseInt(document.getElementById("minEps")?.value) || 10;
    maxEps = parseInt(document.getElementById("maxEps")?.value) || 26;
    minDur = parseInt(document.getElementById("minDur")?.value) || 15;
    minYear = parseInt(document.getElementById("minYear")?.value) || 0;

    HTML();
    main();
}

function HTML() {
    document.querySelectorAll(".mb-3").forEach(a => a.remove());
    document.querySelector(".btn.btn-primary").remove();

    div = document.createElement("divprincipal");
    img = document.createElement("img");
    img.src = "akina.gif";
    img.id = "imagem";
    h1 = document.createElement("h1");
    h1.style = "text-align: center; font-size: 80px; font-family: Verdana, Geneva, Tahoma, sans-serif;";
    h1.textContent = "Resultados";
    document.body.appendChild(div);
    div.appendChild(img);
    div.appendChild(h1);
}

function main() {
    array = Object.entries(listUsersPerAnime);
    array = array.filter(a => a[1].episodes >= minEps)
    array = array.filter(a => a[1].episodes <= maxEps)
    array = array.filter(a => a[1].duration >= minDur)
    array = array.filter(a => a[1].yearDate >= minYear)

    listUsersPerAnime = Object.fromEntries(array)

    for (let userGame of usersGame) {
        sortear();
        function sortear() {
            animeSort = getRandomKeyObj(listUsersPerAnime)
    
            if (verifyWatched(userGame, animeSort)) {
                sortear();
            } else {
                let h2 = document.createElement("h2");
                h2.textContent = `Anime do(a) ${userGame} => ${animeSort}`
                div.appendChild(h2);
            }
        }
    }
}

function verifyWatched(user, anime) {
    if (listUsersPerAnime[anime]["users"].includes(user)) return true
    else return false
}

function getRandomKeyObj(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1 / ++count)
            result = prop;
    return result;
}