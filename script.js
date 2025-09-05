
// to show your library
document.querySelector("#playlistID").addEventListener("click", (e) => {
    document.getElementById("left").classList.add("md:h-[91vh]");
    document.getElementById("left").classList.remove("md:h-[626px]");
    document.getElementById("hidden").classList.add("hidden");
    document.getElementById("yourPlayList").classList.remove("hidden");
    document.getElementById("songSection").classList.add("hidden");
    document.getElementById("oneByone").classList.remove("hidden");
    document.getElementById("line1").classList.add("md:hidden");
    document.getElementById("line2").classList.add("hidden");
    document.getElementById("grids").classList.add("md:hidden");
    document.getElementById("copyRight").classList.add("hidden");
    document.getElementById("banner").classList.add("md:hidden");
    document.getElementById("playBar").classList.remove("hidden");
    document.getElementById("main_img").src = "music.svg"
});

// to go back
document.querySelector("#goBack").addEventListener("click", (e) => {
    document.getElementById("left").classList.remove("md:h-[91vh]");
    document.getElementById("left").classList.add("md:h-[626px]");
    document.getElementById("left").classList.remove("hidden", "md:flex");
    document.getElementById("hidden").classList.remove("hidden");
    document.getElementById("oneByone").classList.add("hidden");
    document.getElementById("yourPlayList").classList.add("hidden");
    document.getElementById("songSection").classList.remove("hidden");
    document.getElementById("line1").classList.remove("md:hidden");
    document.getElementById("line2").classList.remove("hidden");
    document.getElementById("grids").classList.remove("md:hidden");
    document.getElementById("copyRight").classList.remove("hidden");
    document.getElementById("banner").classList.remove("md:hidden");
    document.getElementById("playBar").classList.add("hidden");
    document.getElementById("mobile_hidden").classList.remove("hidden");
})



document.querySelector("#hamburger").addEventListener("click", () => {
    document.getElementById("yourPlayList").classList.add("h-screen");
    document.getElementById("left").classList.add("h-[100vh]");
    document.getElementById("hidden").classList.add("hidden");

    document.querySelector("#left").classList.remove("hidden")
    document.querySelector("#playBar").classList.remove("hidden")
    document.querySelector("#left").classList.add("w-screen")
    document.querySelector("#yourPlayList").classList.remove("hidden")
    document.querySelector("#right").classList.add("hidden")
    document.querySelector("#goBack").classList.add("hidden")
    document.querySelector("#mobileBack").classList.remove("hidden")
    document.querySelector("#back180").classList.remove("hidden")
})


document.querySelector("#mobileBack").addEventListener("click", () => {
    document.querySelector("#left").classList.add("hidden")
    document.querySelector("#playBar").classList.add("hidden")
    // document.querySelector("#left").classList.remove("w-screen")
    document.querySelector("#yourPlayList").classList.add("hidden")
    document.querySelector("#right").classList.remove("hidden")

    document.querySelector("#songSection").classList.remove("hidden")
    document.querySelector("#mobile_hidden").classList.remove("hidden")
    document.querySelector("#goBack").classList.remove("hidden")
    document.querySelector("#oneByone").classList.add("hidden")
    // document.querySelector("#mobileBack").classList.add("hidden")
})


document.querySelector("#back180").addEventListener("click", () => {
    document.querySelector("#left").classList.add("hidden")
    document.querySelector("#right").classList.remove("hidden")
    document.querySelector("#oneByone").classList.remove("hidden")

    document.getElementById("left").classList.add("md:h-[91vh]");
    document.getElementById("hidden").classList.add("hidden");
    document.getElementById("yourPlayList").classList.remove("hidden");
    document.getElementById("songSection").classList.add("hidden");
    document.getElementById("line1").classList.add("hidden");
    document.getElementById("line2").classList.add("hidden");
    document.getElementById("grids").classList.add("md:hidden");
    document.getElementById("copyRight").classList.add("hidden");
    document.getElementById("banner").classList.add("md:hidden");
    document.getElementById("playBar").classList.remove("hidden");
    document.getElementById("mobile_hidden").classList.add("hidden");
})

//volume up/down
document.querySelector("#volume").addEventListener("change", (e) => {
    currentSong.volume = (e.target.value) / 100
})

document.querySelector("#volID").addEventListener("click", (e) => {
    if (e.target.src.includes("volume.svg")) {
        e.target.src = e.target.src.replace("volume.svg", "mute.svg")
        currentSong.volume = 0
    }
    else {
        e.target.src = e.target.src.replace("mute.svg", "volume.svg")
        currentSong.volume = 0.5
    }
})



let currentSong = new Audio();
let songs;
let currfolder;


async function fetchSongs(folder) {
    currfolder = folder;
    // console.log(currfolder)
    let a = await fetch(`http://127.0.0.1:5501/${folder}`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp4")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }


    let songUL = document.querySelector("#yourPlayList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML +
            `<li class="hover:translate-y-[-2px]">
                        <div id="sName">
                            <img src="music.svg" alt="">
                            <p>${song.replaceAll("%20", " ")}</p>
                        </div>
                        <div id="play">
                            <p id="play">Play Now</p>
                            <img src="play.svg" alt="">
                        </div>

                    </li>`;

    }


    //play the audio
    Array.from(document.querySelector("#list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector("#sName").children[1].innerHTML)
            audioPlay(e.querySelector("#sName").children[1].innerHTML.trim())
            play.src = "pause.svg"
        })
    })
}

let track
const audioPlay = (track, pause = false) => {
    currentSong.src = `/${currfolder}/` + track
    if (!false) {
        currentSong.play()
        play.src = "play.svg"
    }
    document.querySelector("#songName").innerHTML = decodeURI(track);
    document.querySelector("#songTime").innerHTML = `00:00 / 00:00`
}



async function playLists() {
    let a = await fetch(`http://127.0.0.1:5501/playLists/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector("#cardContainer")
    let array = Array.from(anchors)
    let newfolder

    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/playLists/")) {
            newfolder = e.href.split("/").splice(-2)[1]
            //geting data of folders
            let a = await fetch(`http://127.0.0.1:5501/playLists/${newfolder}/info.json`)
            let response = await a.json()
            cardContainer.innerHTML = cardContainer.innerHTML +
                `<div data-folder="${newfolder}"
                        class="playlist_no_1 card flex flex-col w-[180px] gap-0.5 shrink-0 md:bg-none
                        hover:bg-gradient-to-b  hover:from-[#100f0f0e] hover:to-[#1a1919] hover:to-50% pb-5 rounded-[6px] cursor-default bg-gradient-to-b from-[#302e2ea7] to-[#59585826] to-80%">

                        <div class="flex w-[180px] h-[180px] justify-center items-center">
                            <img class="w-40 h-40 object-cover object-bottom-right rounded-lg" src="/playLists/${newfolder}/cover.jpg" alt="">
                        </div>
                        <p class="font-semibold text-[26px]  pl-2">${response.title}</p>
                        <p class="font-normal text-[12px]  pl-2">${response.discription}</p>
                    </div>`
        }
    }

    // show details of first playlist
    document.querySelectorAll(".playlist_no_1").forEach((el) => {
        el.addEventListener("click", (e) => {
            document.getElementById("left").classList.add("md:h-[91vh]");
            document.getElementById("left").classList.remove("md:h-[626px]");
            document.getElementById("hidden").classList.add("hidden");
            document.getElementById("yourPlayList").classList.remove("hidden");
            document.getElementById("songSection").classList.add("hidden");
            document.getElementById("oneByone").classList.remove("hidden");
            document.getElementById("line1").classList.add("hidden");
            document.getElementById("line2").classList.add("hidden");
            document.getElementById("grids").classList.add("md:hidden");
            document.getElementById("copyRight").classList.add("hidden");
            document.getElementById("banner").classList.add("md:hidden");
            document.getElementById("playBar").classList.remove("hidden");
            // document.getElementById("main_img").src = `/${currfolder}/cover.jpg`
            // console.log(newfolder)
            document.getElementById("mobile_hidden").classList.add("hidden");
        });
    });

    //load individual folder when playlist folder is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await fetchSongs(`playLists/${item.currentTarget.dataset.folder}`)
            // playLists/${item.currentTarget.dataset.folder
        })
    })

    // document.querySelector("#main_img").src = `/playLists/${newfolder}/cover.jpg`
}



async function main() {
    await fetchSongs(`playLists/naats`)
    audioPlay(songs[0], true)
    currentSong.pause()

    //to add multiple folders
    playLists()



    document.querySelector("#goBack").addEventListener("click", (e) => {
        currentSong.pause()
        play.src = "play.svg"
    })

}


//play and pause the songs
let play = document.querySelector("#buttons").children[1]
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play()
        play.src = "pause.svg"
    }
    else {
        currentSong.pause()
        play.src = "play.svg"
    }
})

// time tracking event listner
currentSong.addEventListener("timeupdate", () => {
    document.querySelector("#songTime").innerHTML = `0${(currentSong.currentTime / 60).toFixed(2)} / 0${(currentSong.duration / 60).toFixed(2)}`

    let style = document.querySelector("#circle").style
    style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
})

// adjusting time using cursur
document.querySelector("#playLine").addEventListener("click", (e) => {
    let seek = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector("#circle").style.left = seek + "%";
    currentSong.currentTime = (currentSong.duration * seek) / 100;
})




main()


let previous = document.querySelector("#previuos")
// to play previous song
previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index - 1) >= 0) {
        audioPlay(songs[index - 1])
    }
})

// to play next song
let next = document.querySelector("#next")
next.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index + 1) > length) {
        audioPlay(songs[index + 1])
    }
})


