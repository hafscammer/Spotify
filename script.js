
// to show your library
document.querySelector("#playlistID").addEventListener("click", (e) => {
    document.getElementById("left").classList.add("md:h-[91vh]");
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
});

// to go back
document.querySelector("#goBack").addEventListener("click", (e) => {
    document.getElementById("left").classList.remove("md:h-[91vh]");
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


// show details of first playlist
document.querySelector("#playlist_no_1").addEventListener("click", (e) => {
    document.getElementById("left").classList.add("md:h-[91vh]");
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
    document.getElementById("main_img").src = "evelyn.avif"
    document.getElementById("mobile_hidden").classList.add("hidden");
});


// show details of second playlist
document.querySelector("#playlist_no_2").addEventListener("click", (e) => {
    document.getElementById("left").classList.add("md:h-[91vh]");
    document.getElementById("left").classList.add("h-screen");
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
    document.getElementById("main_img").src = "bmw2.jpg"
    document.getElementById("mobile_hidden").classList.add("hidden");
});


document.querySelector("#hamburger").addEventListener("click", () => {
    console.log("its clicked")
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
})


document.querySelector("#mobileBack").addEventListener("click", () => {
    document.querySelector("#left").classList.add("hidden")
    document.querySelector("#playBar").classList.add("hidden")
    document.querySelector("#left").classList.remove("w-screen")
    document.querySelector("#yourPlayList").classList.add("hidden")
    document.querySelector("#right").classList.remove("hidden")
    document.querySelector("#goBack").classList.remove("hidden")
    document.querySelector("#mobileBack").classList.add("hidden")
})

let currentSong = new Audio();


async function fetchSongs() {
    let a = await fetch("./songs")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp4")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
const audioPlay = (track, pause = false) => {
    currentSong.src = /songs/ + track
    if (!false) {
        currentSong.play()
        play.src = "play.svg"
    }
    document.querySelector("#songName").innerHTML = decodeURI(track);
    document.querySelector("#songTime").innerHTML = `00:00 / 00:00`
}


async function main() {
    let songs = await fetchSongs()

    audioPlay(songs[0], true)

    let songUL = document.querySelector("#yourPlayList").getElementsByTagName("ul")[0]
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

    document.querySelector("#goBack").addEventListener("click", (e) => {
        currentSong.pause()
    })
    document.querySelector("#playlistID").addEventListener("click", (e) => {
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
    console.log(currentSong.duration)
    console.log(seek)

})



main()


